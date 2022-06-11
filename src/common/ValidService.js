// 주석 요점
// 1. 왜 사용하는지를 명시한다.
// 2. 어떻게 사용하는지 방법을 적는다.
// 3. 어디서 사용하는지 적는다. 
// 4. 주석은 의미를 적는게 아니다. 

// 왜? 유효성 체크를 위한 클래스 입니다. 
// 어떻게 사용하나요? 
/**
 * const ValidService = new ValidSettingService();
 * const validService = new ValidService();
 * validService.print();
 */
// 어디서 사용하나요? Modal.vue 에서 유효성체크할때 사용하고 있습니다. LINE:114
export function ValidSettingService() {
  let input = "";
  let errorMsg = "";
  let callback = {};
  let dbList = [];

  return function () {

    this.initService = function(obj = {input: "", errorMsg: "", callback: {}, dbList: {}}) {
      input = obj.input;
      errorMsg = obj.errorMsg;
      callback = obj.callback;
      dbList = obj.dbList;
    }

    this.print = function () {
      console.log(input, errorMsg, callback);
    };
    this.setDbList = function(dbs) {
      dbList = dbs;
    }
    this.setInput = function (i) {
      input = i;
    };
    this.setErrorMsg = function (e) {
      errorMsg = e;
    };
    this.setCallback = function (c) {
      callback = c;
    };
    this.isValid = function() {
      if (input) {
        callback();
        new Error(errorMsg);
      }
    }
    this.isValidConfirm = function() {
      const isName = dbList.filter((dbName) => {
        return dbName === input;
      });
      callback(isName);
    }
  };
}

export default {
  input: "",
  errorMsg: "",
  callback: {},
  setInput: function (input) {
    this.input = input;
  },
  setErrorMsg: function (msg) {
    this.errorMsg = msg;
  },
  setCallback: function (callback) {
    this.callback = callback;
  },
  init: function (paramValid) {
    paramValid(this.input, this.errorMsg, this.callback);
  },
  isValid: (input, errorMsg, callback) => {
    if (!input) {
      callback();
      new Error(errorMsg);
    }
  },
  isValidConfirm: (input, dbList, callback) => {
    const isName = dbList.filter((dbName) => {
      return dbName === input;
    });
    callback(isName);

    // if (isName.length > 0) {
    //   const r = confirm('동일한 대화명을 사용 중인 유저가 있습니다. \n 변경없이 이대로 계속 하시겠습니까?')
    //   if (!r) {
    //     return false;
    //   } else {
    //     alert("축하 합니다. 당신은 입장 중 입니다.")
    //   }
    // }
  },
};
