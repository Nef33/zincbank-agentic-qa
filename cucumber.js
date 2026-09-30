module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['hooks/**/*.ts', 'step-definitions/**/*.ts'],
    format: [
      'progress-bar',
      'html:reports/cucumber-report.html',
      'allure-cucumberjs/reporter'
    ],
    formatOptions: {
      resultsDir: 'allure-results'
    },
    paths: ['features/**/*.feature']
  }
};
