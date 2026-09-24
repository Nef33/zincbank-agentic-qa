Feature: Login

  @REQ-LOGIN-001 @REQ-LOGIN-002
  Scenario: Sign in with valid credentials
    Given I am on the ZincBank login page
    When I enter a valid email and password and click "Sign in"
    Then I am granted access to my account

  @REQ-LOGIN-003 @REQ-LOGIN-004
  Scenario: Sign in with invalid credentials
    Given I am on the ZincBank login page
    When I enter an invalid email and password and click "Sign in"
    Then I see an error message
    And I am kept on the login page

  @REQ-LOGIN-005
  Scenario: Open an account from the login page
    Given I am on the ZincBank login page
    When I click "Open an account"
    Then I am taken to /apply