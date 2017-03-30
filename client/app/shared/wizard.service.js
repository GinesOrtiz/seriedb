const WizardService = ($http) => {
  'use strict';
  let wizards = [];
  const API_URL = __API_URL__;

  /**
   * Check the pending wizards from the user and save it into user.service
   */
  const getWizards = () => {
    return $http({
      url: `${API_URL}/wizard`
    })
      .then(({data}) => {
        wizards = data.wizards;
        return data;
      });
  };

  /**
   * Send wizard information to server
   */
  const sendWizard = (wizard) => {
    return $http({
      url: `${API_URL}/wizard`,
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      data: wizard
    })
      .then(({data}) => {
        wizards.splice(wizards.indexOf(data.wizard), 1);
        return data;
      });
  };

  /**
   * Returns all the pending wizards by the user
   * @returns {array} - pending wizards
   */
  const getUserWizards = () => {
    return wizards;
  };

  /**
   * Returns if given wizard name is pending or done
   * @returns {bool}
   */
  const checkWizard = (wizard) => {
    return wizards.indexOf(wizard) > -1;
  };

  return {
    getWizards,
    sendWizard,
    getUserWizards,
    checkWizard
  };
};

export default WizardService;
