# Suggested scenarios only.
# These are NOT backed by any RTM requirement and are NOT part of the
# default RTM-backed suite. They exist so a person can decide whether to
# deliberately promote them into real coverage.

Feature: Login — Suggested (not RTM-backed)

  Scenario: Submit the sign-in form with empty Email and Password
    Given I am on the ZincBank login page
    When I click "Sign in" without entering an Email or Password
    Then I am not granted access to my account

  Scenario: Submit the sign-in form with only an Email and no Password
    Given I am on the ZincBank login page
    When I enter an Email and click "Sign in" without entering a Password
    Then I am not granted access to my account

  Scenario: Submit the sign-in form with only a Password and no Email
    Given I am on the ZincBank login page
    When I enter a Password and click "Sign in" without entering an Email
    Then I am not granted access to my account