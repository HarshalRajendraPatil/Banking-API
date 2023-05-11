# Banking-API :

This API is a basic simulation of how real bank works.
It includes features like, 
1. Signup/login to the website.
2. Logged in users should be able to create a bank account on website by giving their personal details.
3. Transfer money accross different bank account.
4. See the transaction history of the account.
5. Make request for loans, deposit and withdraw money.
6. Delete the account.

## Signup/Login = 
1. "/signup" route is for signing up the user by giving the email and password.
2. "/login" route is for logging in the user.

## Creating the bank account = 
1. The logged in user should be able to create the bank account by visiting the "/createAccount" route and provide all the required details.
2. The get request to "/myAccount/id" should give the information of the account.
3. The patch request to "/myAccount/id" will help to update the account details.
4. The delete request to "/myAccount/id" will help to delete the account.

## Depositing, withdrawing and loan =
1. The "/id/deposit" will make the deposit to your account.
2. The "/id/withdraw" will make the withdraw from your account.
3. The "/id/loan" will make the loan request for the money.

## Transaction and Transaction history = 
1. The "/accNum/transferFunds" will make payments to other accounts.
2. The "/accNum/transactionHistory" will give you the transaction history of your account.
