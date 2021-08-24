window.onload = function() {
    // 获取元素
    var tel = document.querySelector("#tel");
    var qq = document.querySelector("#qq");
    var nc = document.querySelector("#nc");
    var msg = document.querySelector("#msg");
    var pwd = document.querySelector("#pwd");
    var surepwd = document.querySelector("#surepwd");

    // 正则表达式
    var regTel = /^1[3|4|5|8]\d{9}$/;
    var regQq = /^[1-9]\d{4,}$/;
    var regNc = /^[\u4e00-\u9fa5]{2,8}$/;
    var regMsg = /^\d{6}$/;
    var regPwd = /^[a-zA-Z0-9_-]{6,8}$/;

    // 验证
    regexp(tel, regTel);
    regexp(qq, regQq);
    regexp(nc, regNc);
    regexp(msg, regMsg);
    regexp(pwd, regPwd);

    function regexp(elem, reg) {
        elem.onblur = function() {
            if (reg.test(this.value)) {
                // 符合
                // tel下一个兄弟节点span的内容进行修改
                this.nextElementSibling.className = "success";
                this.nextElementSibling.innerHTML = "<i class='success_icon'></i>用户名合法";
            } else {
                // 不符合
                this.nextElementSibling.className = "error";
                this.nextElementSibling.innerHTML = "<i class='error_icon'></i>用户名不合法";
            }
        }
    }

    surepwd.onblur = function() {
        if (this.value == pwd.value) {
            this.nextElementSibling.className = "success";
            this.nextElementSibling.innerHTML = "<i class='success_icon'></i>密码正确";
        } else {
            // 不符合
            this.nextElementSibling.className = "error";
            this.nextElementSibling.innerHTML = "<i class='error_icon'></i>两次输入的密码不一致";
        }
    }
}