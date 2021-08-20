// 定义tab栏对象
var that;
class Tab {

    // 构造函数
    constructor(id) {
        /*
            谁调用constructor？
            tab对象实例化的时候就会自动调用constructor构造函数，
            那么根据谁调用就指向谁的原则，this应该指向的是tab对象，
            又因为that = this，所以that也指向了tab对象。
        */
        that = this;
        // 根据id选择器获取tab栏节点
        this.main = document.querySelector(id);
        // 获取+按钮
        this.add = this.main.querySelector(".tabadd");
        // 获取ul
        this.ul = this.main.querySelector(".fisrstnav ul:first-child");
        // 获取tab内容
        this.fsection = this.main.querySelector(".tabscon");
        // 每次打开网页都执行init
        this.init();
    }

    // 获取li和section
    updateNode() {
        // 获取所有的li
        this.lis = this.main.querySelectorAll("li");
        // 获取素有的section
        this.sections = this.main.querySelectorAll("section");
        // 获取x按钮
        this.remove = this.main.querySelectorAll(".icon-guanbi");
        // 获取fisrstnav中的第一个span
        this.spans = this.main.querySelectorAll(".fisrstnav li span:first-child");

    }

    // 为每一个tab标签绑定点击事件
    init() {
        // 每次执行init重新获取一次li和section
        this.updateNode();
        // 为+绑定点击事件
        this.add.onclick = this.addTab;
        /*
            谁调用init()？
            在constructor构造函数中，使用this调用了init()，
            因为this指向的是tab对象，那么根据谁调用就指向谁的原则，
            init()中的this应该指向的也是tab对象。
        */
        // 为每一个li添加一个索引和点击事件
        for (var i = 0; i < this.lis.length; i++) {
            // 为每一个li添加一个自定义属性记录序号
            this.lis[i].index = i;
            // 添加点击事件
            this.lis[i].onclick = this.toggleTab;
            // 为每一个x按钮绑定一个点击事件
            this.remove[i].onclick = this.removeTab;
            // 为每一个li添加双击鼠标事件
            this.spans[i].ondblclick = this.editTab;
            // 为每一个section添加双击鼠标事件
            this.sections[i].ondblclick = this.editTab;
        }
    }

    // 切换tab栏
    toggleTab() {
        // 清除其他的属性值
        that.clearClass();

        /*
            谁调用toggleTab()？
            在init()中，当点击某一个li就会调用toggleTab函数，
            因为li调用了toggleTab函数，所以此时this指向的是点击的那个li，
            根据谁调用就指向谁的原则，此时的this指向的是点击的那个li。
        */

        // 点击哪一个li就切换到那个li
        this.className = "liactive";
        that.sections[this.index].className = "conactive";
    }

    /*
        谁调用clearClass()？
        在toggleTab()中，that调用了clearClass()，that指向的是tab对象，
        根据谁调用就指向谁的原则，此时的this指向的是tab对象。
    */
    // 清除其他的属性值
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = "";
            this.sections[i].className = "";
        }
    }

    // 添加tab
    addTab() {
        var random = Math.random();
        // 清除所有的属性值
        that.clearClass();
        // 生成一个li
        var li = '<li class="liactive"><span>新标签</span><span class="iconfont icon-guanbi"></span></li>';
        // 生成一个section
        var section = '<section class="conactive">新的测试' + random + '</section>';
        // 将li添加到ul标签中
        that.ul.insertAdjacentHTML("beforeend", li);
        // 将section添加到tab内容中
        that.fsection.insertAdjacentHTML("beforeend", section);
        // 重新获取li和section并绑定事件
        that.init();
    }

    // 删除按钮
    removeTab(e) {
        // 阻止冒泡发生，防止li执行点击事件切换tab栏
        e.stopPropagation();
        // 当点击其中某一个li时获取其父节点li的索引值
        var index = this.parentNode.index;
        // 删除li
        that.lis[index].remove();
        // 删除section
        that.sections[index].remove();
        // 如果删除的li不是当前选中状态下的li,只删除那个li就行，
        // 不要tab栏自动切换到前一个tab栏
        if (document.querySelector(".liactive")) return;
        // 删除li和sction后，tab栏自动切换到前一个tab栏
        // 点击一下前一个tab栏就行啦
        // 删除之后，索引要减1,然后再点击
        index--;
        // 如果只剩第一个li,再index--会报错
        // 解决方式：
        // that.lis[index]如果为真，再执行that.lis[index].click();
        // that.lis[index]如果为假，那么后面的代码不再执行。
        that.lis[index] && that.lis[index].click();

    }

    editTab() {
        // 禁止双击选中文字
        window.getSelection ? window.getSelection().
        removeAllRanges(): document.selection.empty();
        // 获取span里的值
        var str = this.innerHTML;
        // 双击tab标题，中间的文字变为文本框
        this.innerHTML = "<input type='text' />";
        // 把原来的值输入到文本框
        var input = this.children[0];
        input.value = str;
        // 双击之后，文本处于选中状态
        input.select();
        // 当失去焦点时，恢复未选中状态
        input.onblur = function() {
            // 此时文本框里的值，赋值给span的innerHTML
            this.parentNode.innerHTML = this.value;
        };
        // 当按下回车后，恢复未选中状态
        input.onkeyup = function(e) {
            if (e.keyCode === 13) {
                // 手动调用失去焦点方法
                this.blur();
            }
        };
    }

}

var tab = new Tab("#tab");