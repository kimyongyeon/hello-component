<template>
  <div class="modal">
    <header>
      <div class="left">
        <h1>미리보기</h1>
      </div>
      <div class="right">
        <button>X</button>
      </div>
    </header>
    <hr />
    <section>
      <div class="left inline-block mt-5">
        <img :src="defaultImgUrl" alt="미리보기" />
        <div><h1>#이름#</h1></div>
        <div><button @click="btnEffectiveRemove">효과제거</button></div>
      </div>
      <div class="right inline-block">
        <div class="inline-block">기본</div>
        <div class="inline-block">비디오효과</div>
        <div class="inline-block"><button @click="btnVideoOff">{{videoOnOffName}}</button></div>
        <div class="inline-block"><button @click="btnMute">음소거</button></div>
        <div class="line-wrap mt-5">
          <label for="">대화명 설정</label>
          <input type="text" placeholder="이름 입력 |" @input="validCheck" />
          {{ nickName }}
          <br />
          <div class="mt-5">
            * 지금 대화에서만 적용되며 기본 프로필에는 반영되지 않습니다.
          </div>
          <div class="mt-5">
            <label for="">비디오</label>
            <input type="text" placeholder="선택된 카메라 장비 명">
          </div>
          <div class="mt-5">
            <label for="">마이크</label>
            <input type="text" placeholder="선택된 오디오 장비 명">
            <button @click="btnMicTest">마이크 테스트</button>
          </div>
          <div class="mt-5">
            <label for="">스피커</label>
            <input type="text" placeholder="선택된 오디오 장비 명">
            <button @click="btnSpeakerTest">스피커 테스트</button>
          </div>
        </div>
      </div>
    </section>
    <footer>
      <div class="left inline-block">
        <input type="checkbox">
        <label for="">대화 입장 시, 미리보기 항상 표시</label>
        <p>설정하신 정보는 대화 참여 후에도 설정과 변경이 가능합니다.</p>
        <p>장비가 연결되지 않은 경우, 대화에 참여하여 장비를 설정해 주세요.</p>
      </div>
      <div class="right inline-block">
        <button @click="btnJoin">참여</button>
      </div>
    </footer>
  </div>
</template>

<script>
import commonHelper from '../common/ValidService'
import comment from '../common/FinalConst'
import { ValidSettingService } from '../common/ValidService'
const NICK_ERROR_MSG = comment.ERROR_MSG.NICK_NAME;
export default {
  name: "MoDal",
  data() {
    return {
      nickName: "",
      realName: "",
      defaultImgUrl: "https://picsum.photos/150/150",
      videoOnOffName: "비디오 끄기",
      videoOnOffFlag: false,
      dupNickNameList: ["admin", "guest"],
      joinYn: false,
    };
  },
  methods: {
    btnEffectiveRemove() {

    },
    btnVideoOff() {
      if (!this.videoOnOffFlag) {
        this.defaultImgUrl = "https://via.placeholder.com/150"
        this.videoOnOffName = "비디오 켜기"
      } else {
        this.defaultImgUrl = "https://picsum.photos/150/150"
        this.videoOnOffName = "비디오 끄기"
      }
    },
    btnMute() {

    },
    btnMicTest() {

    },
    btnSpeakerTest() {

    },

    isValidName(name) {
      return name === "" ? false : true;
    },
    isValidDuplName() {
      return false;
    },

    btnJoin() {


      ValidSettingService.isValidConfirm();

      this.realName = this.realName || '';

      // 대화명을 입력해주세요.
      commonHelper.setInput(this.realName);
      commonHelper.setErrorMsg(NICK_ERROR_MSG.NO_NAME)
      commonHelper.setCallback(() => {
        this.nickName = NICK_ERROR_MSG.NO_NAME
      });
      commonHelper.init(commonHelper.isValid);
      // !commonHelper.isValid(this.realName, NICK_ERROR_MSG.NO_NAME, () => {
      //   this.nickName = NICK_ERROR_MSG.NO_NAME
      // })

      !commonHelper.isValidConfirm(this.realName, this.dupNickNameList, (isName) => {
        if (isName.length > 0) {
        const r = confirm(comment.CONFIRM_MSG.NICK_NAME_DUPLICATE)
        if (!r) {
          return false;
        } else {
          alert("축하 합니다. 당신은 입장 중 입니다.")
        }
      }
      });
      
      // 20자 초과 : 대화명은 2~20자 내로 입력해 주세요.
      // 1자 : 대화명은 2~20자 내로 입력해 주세요.
      // 대화명은 공백은 시작할 수 없습니다. 
      // 공백은 연속 사용할 수 없습니다.
      // 동일한 대화명을 사용 중인 유저가 있습니다. \n 변경없이 이대로 계속 하시겠습니까?
      // 운영 정책상 사용할 수 없는 단어가 있습니다. 다시 입력해 주세요.
    },
    validCheck(e) {
      
      const tempName = e.target.value;

      const isNickName = this.dupNickNameList.filter(nickName => {
        return nickName === tempName
      });
      if (isNickName.length > 0) {
        this.nickName = NICK_ERROR_MSG.NAME_DUPLICATE;
      } else if (tempName.substr(0, 1) === ' ') {
        this.nickName = NICK_ERROR_MSG.FIRST_BLANK
      } else if (tempName.indexOf('  ') > -1) {
        this.nickName = NICK_ERROR_MSG.CONTINUOUS_BLANK
      }
      else {
        this.nickName = "";
      }

      this.realName = tempName;
      
      
    },
  },
};
</script>

<style>
img {
  width: 150px;
  height: 150px;
}
.mt-5 {
  margin-top: 5px;
}
.inline-block {
  display: inline-block;
  height: auto;
  width: 50%;
}
.modal {
  width: 480px;
  margin: 0 auto;
  height: 500px;
  
}
header {
  background:  greenyellow;
}
section {
  padding: 5px;
  background: rgb(218, 203, 203);
}
footer {
  padding: 5px;
  background: aqua;
}
header .left {
  width: 50%;
  background: red;
  display: inline-block;
}

header .left h1 {
  text-align: center;
}
header .right {
  width: 50%;
  background: gray;
  display: inline-block;
}
</style>
