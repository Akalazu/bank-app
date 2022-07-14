var inputUser = document.querySelector(".input-user");
var inputPassword = document.querySelector(".input-password");
var username = document.querySelector(".username");
var loginBtn = document.querySelector(".login__btn");
var acctBalance = document.querySelector(".account___main");
var transferBtn = document.querySelector(".transfer__btn");
var depositBtn = document.querySelector(".deposit__btn");
var amount___transfer = document.querySelector(".amount");
var amount__deposit = document.querySelector(".amount-2");
var total___deposit = document.querySelector(".all___in---inner");
var total___withdraw = document.querySelector(".all___out---inner");
var transaction___history = document.querySelector(".transaction-history");
var mainContent = document.querySelector(".main-content");
var sendtoUserId = document.querySelector(".userId");
const account1 = {
  userName: "Code Burster",
  email: "akalazuD@gmail.com",
  transactions: [1200, -500, 7000, -1500, -100, 100000],
  senders: [],
  passcode: 2022,
};
const account2 = {
  userName: "Okebaram Precious",
  email: "realokebaram@gmail.com",
  transactions: [110, -300, 700, -700, 7000, 650],
  senders: [],
  passcode: 222,
};
const account3 = {
  userName: "Fred Chuks",
  email: "fredchuks66@gmail.com",
  transactions: [780, -500, 6000, -900, 650, 800],
  senders: [],
  passcode: 333,
};
const account4 = {
  userName: "Earl Samm",
  email: "earlsamm@gmail.com",
  transactions: [950, -1500, 400, -500, 1100, 400],
  senders: [],
  passcode: 444,
};
const account5 = {
  userName: "Williem Smith",
  email: "williem@gmail.com",
  transactions: [90, -150, 40, -50, 110, 40],
  senders: [],
  passcode: 555,
};
const account6 = {
  userName: "Okafor Mmesoma",
  email: "realMmeso@gmail.com",
  transactions: [9, -1500, 480, -510, 1110, 70],
  senders: [],
  passcode: 666,
};
let receipient;
var accounts = [account1, account2, account3, account4, account5, account6];
var senders = [];
let genUserName = function (acc) {
  acc.forEach((account) => {
    let users = account.userName
      .toLowerCase()
      .split(" ")
      .map((user) => user[0])
      .join("");
    account.userId = users;
  });
};
genUserName(accounts); //generates user id for every registered account
//summary for total withdraw and deposit

let activeUser;

var myDate = new Date();
var hrs = myDate.getHours();

var greet;

if (hrs < 12) {
  greet = "Good Morning";
} else if (hrs >= 12 && hrs <= 17) {
  greet = "Good Afternoon";
} else if (hrs >= 17 && hrs <= 24) {
  greet = "Good Evening";
}

var transactionHistory = function (arr) {
  transaction___history.innerHTML = "";
  arr.transactions.forEach(function (trans, i) {
    if (i < 6) {
      let injectHTML = `<tr>
      <th scope="row">${i}</th>
      <td>${arr.userName}</td>
      <td>${trans > 0 ? "Credit" : "Debit"}</td>
      <td>${trans}</td>
    </tr>`;
      transaction___history.insertAdjacentHTML("afterbegin", injectHTML);
    } else {
      return updateTransactionHistory(arr);
    }
  });
};
loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let inputUserVal = inputUser.value;
  let inputPasswordVal = Number(inputPassword.value);
  activeUser = accounts.find(
    (account) => account.passcode === inputPasswordVal
  );
  if (
    inputUserVal == activeUser?.userId &&
    inputPasswordVal == activeUser?.passcode
  ) {
    Swal.fire({
      title: `Welcome, ${activeUser.userName}`,
      text: "Details Match!",
      icon: "success",
      timer: 3000,
      showConfirmButton: false,
    });
    mainContent.style.opacity = "1";
    mainContent.style.transition = "all 1s";
    inputUser.value = "";
    inputPassword.value = "";
    username.textContent = ` ${greet}, ${activeUser.userName.slice(
      0,
      activeUser.userName.indexOf(" ")
    )}`;
    summary(activeUser);
  } else {
    Swal.fire({
      title: `Wrong User ID OR Password`,
      text: "Details do not Match!, kindly contact an admin to get registered",
      icon: "error",
    });
  }

  transactionHistory(activeUser);
  // updateTransactionHistory(activeUser);
});
// account1.transactions.forEach(trans, i)
// var remainingBalance;
function summary(arr) {
  var remainingBalance = arr.transactions.reduce(
    (acc, curr) => (acc += curr),
    0
  );
  arr.balance = remainingBalance;
  // console.log(remainingBalance);
  var totalDeposit = arr.transactions
    .filter((transaction) => transaction > 0)
    .reduce((acc, curr) => acc + curr, 0);

  var totalWithdraw = arr.transactions
    .filter((transaction) => transaction < 0)
    .reduce((acc, curr) => acc + curr, 0);
  let htmlDeposit = "&#8358; " + totalDeposit.toLocaleString();
  let htmlWithdraw = "&#8358; " + totalWithdraw.toLocaleString().slice(1);
  let htmlAcctBal = "&#8358; " + remainingBalance.toLocaleString();
  total___deposit.innerHTML = htmlDeposit;
  total___withdraw.innerHTML = htmlWithdraw;
  acctBalance.innerHTML = htmlAcctBal;

  //   let html = ``
  //   transaction___history.insertAdjacentHTML("afterbegin", )

  //   // -1100;
}
//passes the array of current user gets the last transaction and its index with the receipient
let updateTransactionHistory = function (arr) {
  let injectHTML = `<tr>
      <th scope="row">${arr.transactions.length - 1}</th>
      <td>${
        receipient?.userName === arr?.userName
          ? arr.senders[arr.senders.length - 1]
          : receipient.userName
      }</td>
      <td>${
        arr.transactions[arr.transactions.length - 1] > 0 ? "Credit" : "Debit"
      }</td>
      <td>${arr.transactions[arr.transactions.length - 1]}</td>
    </tr>`;
  return transaction___history.insertAdjacentHTML("afterbegin", injectHTML);
};

depositBtn.addEventListener("click", () => {
  // let type = "Deposit";
  let typeOfOperation = "Credit";
  activeUser.transactions.push(Number(amount__deposit.value));
  Swal.fire({
    title: `Success`,
    text: `You've successfully deposited ₦${amount__deposit.value} into your account`,
    icon: "success",
    confirmButtonClass: "btn-success",
  });
  // console.log(activeUser.transactions.find(transc => amount__deposit.value));
  let htmlDeposit = `<tr>
            <th scope="row">${activeUser.transactions.length - 3}</th>
            <td>${activeUser.userName.slice(0)}</td>
            <td>${typeOfOperation}</td>
            <td>${Number(amount__deposit.value)}</td>
          </tr>`;
  transaction___history.insertAdjacentHTML("afterbegin", htmlDeposit);
  summary(activeUser);
  amount__deposit.value = "";
  // alert(amount__deposit.value);
}); //modify this code later!!

// TRANSFER OPERATION
transferBtn.addEventListener("click", () => {
  // let typeOfOperation = "Transfer";
  let amountToTransfer = -1 * Number(amount___transfer.value);
  receipient = accounts.find(
    (account) => sendtoUserId.value === account.userId
  );
  if (
    receipient.userId !== activeUser.userId &&
    activeUser.balance >= Math.abs(amountToTransfer) &&
    Math.sign(Number(amount___transfer.value)) === 1 &&
    Number(amount___transfer.value) > 0
  ) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirmed!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Successful!",
          "You have transferred " +
            "₦ " +
            Math.abs(amountToTransfer) +
            " to " +
            receipient.userName,
          "success"
        );
      }
      if (receipient) {
        activeUser.transactions.push(amountToTransfer);
        receipient.transactions.push(-1 * amountToTransfer);
        console.log(receipient);
        summary(activeUser);
        updateTransactionHistory(activeUser);
        receipient.senders.push(activeUser.userName);
        amount___transfer.value = "";
        sendtoUserId.value = "";
        amount___transfer.blur();
      }
    });
  } else {
    Swal.fire(
      "Error!",
      "Transfer cannot be initialized, kindly crosscheck your inputs",
      "warning"
    );
  }
});