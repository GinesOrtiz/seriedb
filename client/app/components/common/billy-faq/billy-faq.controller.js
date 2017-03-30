/**
 * This module replaces intercom with a custom FAQ and adds a button to open the real one
 */
class billyFaqController {
  constructor($log, IntercomService, BigLoaderService, UserService, FaqService, $mdSidenav, $scope,
              $filter, localStorage) {
    this.$log = $log;
    this.$filter = $filter;
    this.$scope = $scope;
    this.$mdSidenav = $mdSidenav;
    this.IntercomService = IntercomService;
    this.FaqService = FaqService;
    this.intercomTopic = '';
    this.filterQuestions = [];
    this.filterQuestionsLeft = true;
    this.questionsIndex = [];
    this.lang = localStorage.getItem('language', true);
    this.user = UserService.getState();
    this.firstTime = true;
    this.faq = {};

    this.$scope.$on('openFaqSidebar', () => {
      BigLoaderService.setState('show');
      this.FaqService.getFaq(this.lang)
        .then((faq) => {
          BigLoaderService.setState('hide');
          this.questionsIndex[this.lang] = faq.questionsIndex;
          this.filterQuestions = faq.filterQuestions;
          this.faq[this.lang] = faq.content;
          this.$mdSidenav('billyFaq')
            .toggle();
        });
    });
  }

  /**
   * Open the real intercom
   */
  openIntercom() {
    document.getElementsByTagName('html')[0].classList.toggle('openSidebar');
    this.openBillyIntercom();
    this.IntercomService.run('show');
  }

  /**
   * Open from our button
   */
  openBillyIntercom() {
    this.$mdSidenav('billyFaq')
      .toggle();
    this.closeNoButton();
  }

  /**
   * Close FAQ
   */
  close() {
    this.$mdSidenav('billyFaq')
      .close();
  }

  /**
   * Detects when sidebar is toggled
   */
  closeNoButton() {
    if (this.firstTime) {
      this.firstTime = false;
      this.$scope.$watch(() => {
        return this.$mdSidenav('billyFaq')
          .isOpen();
      }, () => {
        document.getElementsByTagName('html')[0].classList.toggle('openSidebar');
      });
    }
  }

  faqFilter() {
    Object.keys(this.faq)
      .forEach((lang) => {
        this.filterQuestionsLeft = 0;
        this.faq[lang].forEach((questBlock) => {
          this.filterQuestions[questBlock.title] = this.$filter('filter')(questBlock.questions, {
            a: this.intercomTopic
          });
          this.filterQuestionsLeft =
            this.filterQuestionsLeft + this.filterQuestions[questBlock.title].length;
        });
      });
  }

  goToIndex(index) {
    let target = document.getElementById('faq_' + index);
    let container = document.getElementsByClassName('questions-container')[0];
    this.animateScroll(container, 'scrollTop', '', 0, target.offsetTop - 80,
      300 + (target.offsetTop / 5), true);
  }

  animateScroll(elem, style, unit, from, to, time, prop) {
    if (!elem) {
      return;
    }
    let start = new Date().getTime(),
      timer = setInterval(function () {
        let step = Math.min(1, (new Date().getTime() - start) / time);
        if (prop) {
          elem[style] = (from + step * (to - from)) + unit;
        }
        else {
          elem.style[style] = (from + step * (to - from)) + unit;
        }
        if (step === 1) {
          clearInterval(timer);
        }
      }, 10);
    elem.style[style] = from + unit;
  }

}

export default billyFaqController;
