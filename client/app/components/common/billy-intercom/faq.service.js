const FaqService = ($http, $q) => {
  'use strict';

  const BASE_URL = 'https://billymob.com/assets/faq/Affiliates/index.php';
  let faqRequest = {};

  const getFaq = (lang = 'EN') => {
    if (faqRequest[lang]) {
      let dfd = $q.defer();

      dfd.resolve(faqRequest[lang]);

      return dfd.promise;
    }
    else {
      return $http.get(`${BASE_URL}?lang=${lang}`)
        .then((res) => {
          let questionsIndex = [];
          let filterQuestions = {};

          res.data.forEach((questBlock) => {
            questionsIndex.push(questBlock.title);
            questBlock.questions.forEach((quest) => {
              // Append the question to the answer to search in the filter
              quest.answer += '<i>' + quest.question + '</i>';
            });
            filterQuestions[questBlock.title] = questBlock.questions;
          });

          faqRequest[lang] = {
            questionsIndex,
            filterQuestions,
            content: res.data
          };

          return faqRequest[lang];
        });
    }
  };

  return {getFaq};
};

FaqService.$inject = [
  '$http',
  '$q'
];

export {FaqService};
