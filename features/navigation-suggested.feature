# SUGGESTED SCENARIOS — NOT RTM-BACKED
# These scenarios are NOT covered by docs/rtm-navigation.md.
# Do not use them for requirements compliance; they are proposals only.

Feature: Navigation (suggested scenarios)

  Scenario: Return to the home page from a section
    Given I am on the Accounts page
    When I return to the home page
    Then I am on the home page, confirmed by URL

  Scenario: Navigate directly between sections
    Given I am on the Accounts page
    When I click the "Move Money" tab
    Then I am on the Move Money page, confirmed by URL

  Scenario: Confirm the destination page content is displayed
    Given I am on the ZincBank home page
    When I click the "Cards" tab
    Then I see the Cards page content, confirmed by URL