Feature: Navigation

  @REQ-NAV-001
  Scenario: Navigate to the Dashboard page
    Given I am on the ZincBank home page
    When I click the "Dashboard" tab
    Then I am on the Dashboard page, confirmed by URL

  @REQ-NAV-002
  Scenario: Navigate to the Accounts page
    Given I am on the ZincBank home page
    When I click the "Accounts" tab
    Then I am on the Accounts page, confirmed by URL

  @REQ-NAV-003
  Scenario: Navigate to the Move Money page
    Given I am on the ZincBank home page
    When I click the "Move Money" tab
    Then I am on the Move Money page, confirmed by URL

  @REQ-NAV-004
  Scenario: Navigate to the Transactions page
    Given I am on the ZincBank home page
    When I click the "Transactions" tab
    Then I am on the Transactions page, confirmed by URL

  @REQ-NAV-005
  Scenario: Navigate to the Cards page
    Given I am on the ZincBank home page
    When I click the "Cards" tab
    Then I am on the Cards page, confirmed by URL