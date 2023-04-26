Feature: DiceValueMultiple

A short summary of the feature

@3_of_the_same_eyes
Scenario: 3 of the same eyes
	Given 6 dices has rolled
	When out the dices, 3 of them are 2 eyes
	Then it counts to 200 points

@3_of_the_same_eyes_are_one
Scenario: 3 of the same eyes are 1
	Given 6 dices has rolled
	When out the dices, 3 of them are 1 eyes
	Then it counts to 1000 points

@4_of_the_same_eyes
Scenario: 4 of the same eyes
	Given 6 dices has rolled
	When out the dices, 4 of them are 2 eyes
	Then it counts to 400 points

@3_of_the_same_eyes_are_one
Scenario: 4 of the same eyes are 1
	Given 6 dices has rolled
	When out the dices, 4 of them are 1 eyes
	Then it counts to 2000 points

@5_of_the_same_eyes
Scenario: 5 of the same eyes
	Given 6 dices has rolled
	When out the dices, 5 of them are 2 eyes
	Then it counts to 800 points

@5_of_the_same_eyes_are_one
Scenario: 5 of the same eyes are 1
	Given 6 dices has rolled
	When out the dices, 5 of them are 1 eyes
	Then it counts to 4000 points

@6_of_the_same_eyes
Scenario: 6 of the same eyes
	Given 6 dices has rolled
	When out the dices, 6 of them are 2 eyes
	Then it counts to 1600 points

@6_of_the_same_eyes_are_one
Scenario: 6 of the same eyes are 1
	Given 6 dices has rolled
	When out the dices, 6 of them are 1 eyes
	Then it counts to 10000 points

@Wrong_Input
Scenario: When API get's wrong input
	Given 6 dices has rolled
	When out the dices, 2 of them are 2 eyes
	Then it counts to 0 points