Feature: DiceRuleFirstNumberSingleCase

A short summary of the feature:
This feature is about dice 10.000 rules with one or 5 eyes dices.
A different score is set on the conditions following the rules.

@one_dice_is_1_or_5
Scenario: one dice, one eye
	Given The dices gets rolled
	When a single dice is 1
	Then the current round score would be 100

@one_dice_is_5
Scenario: one dice, five eye
	Given The dices gets rolled
	When a single dice is 5
	Then the current round score would be 50
	
@two_dices_is_5  
Scenario: two dices, five eyes
	Given The dices gets rolled
	When two dices is 5, 5
	Then the current round score would be 100

@two_dices_is_1  
Scenario: two dices, one eyes
	Given The dices gets rolled
	When two dices is 1, 1
	Then the current round score would be 200

@two_dices_is_1_&_5  
Scenario: two dices, one & five eye
	Given The dices gets rolled
	When two dices is 1, 5
	Then the current round score would be 150


@three_dices_is_5_5_1  
Scenario: three dices, 2x5 & one eye
	Given The dices gets rolled
	When three dices is 1, 5, 5
	Then the current round score would be 200

@three_dices_is_5_1_1  
Scenario: three dices, 5 & 2x1 eyes
	Given The dices gets rolled
	When three dices is 1, 1, 5
	Then the current round score would be 250

@four_dices_is_5_5_1_1  
Scenario: four dices, 2x5 & 2x1 eyes
	Given The dices gets rolled
	When four dices is 1, 1, 5, 5
	Then the current round score would be 300

@straight_dices_is_1,2,3,4,5,6 
Scenario: straight dices, 1,2,3,4,5,6 eyes
	Given The dices gets rolled
	When all dices is 1, 2, 3, 4, 5, 6
	Then the current round score would be 1000

@two_dices_is_5  
Scenario: Sorting incorrect on two dices
	Given The dices gets rolled
	When two dices is 5, 1
	Then the current round score would be 0

@three_dices_is_5_1_1  
Scenario: Sorting incorrect on three dices, 5 & 2x1 eyes
	Given The dices gets rolled
	When three dices is 5, 1, 1
	Then the current round score would be 0

@four_dices_is_5_1_1  
Scenario: Sorting incorrect on four dices, 2x5 & 2x1 eyes
	Given The dices gets rolled
	When four dices is 5, 1, 5, 1
	Then the current round score would be 0

@straight_dices_is_2,1,3,4,5,6 
Scenario: Sorting straight incorrect order dices, 2,1,3,4,5,6 eyes
	Given The dices gets rolled
	When all dices is 2, 1, 3, 4, 5, 6
	Then the current round score would be 0

@Wrong_input 
Scenario: Wrong input from API
	Given The wrong input
	When it receives a dice with 0 eyes
	Then the current round score would be 0



	
