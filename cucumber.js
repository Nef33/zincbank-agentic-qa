module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['step-definitions/**/*.ts'],
    format: ['progress-bar', 'html:reports/cucumber-report.html'],
    paths: ['features/**/*.feature']
  }
};
