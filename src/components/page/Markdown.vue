<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-service"></i> 客服
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div id="wangeditor">
            <!-- 会话列表 -->
            <div class="SessionList">
                <header class="list-head-left">
                    <div class="list-chart">
                        <img
                            src="http://pic.51yuansu.com/pic3/cover/02/79/99/5a4b45c6d70f4_610.jpg"
                        />
                    </div>
                    <div class="Choice">
                        <span>客服小童</span>
                        <div>
                            <select class="state">
                                <option>在线</option>
                                <option>离线</option>
                            </select>
                        </div>
                    </div>
                </header>
                <div>
                    <el-tabs v-model="message" stretch>
                        <el-tab-pane
                            v-bind:class="{ active: isActive }"
                            :label="`会话(${unread.length})`"
                            name="first"
                        >
                            <el-table :data="unread" :show-header="false">
                                <el-table-column>
                                    <template slot-scope="scope">
                                        <span class="message-title">{{scope.row.title}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="date"></el-table-column>
                                <el-table-column width="80">
                                    <template slot-scope="scope">
                                        <el-button size="small" @click="handleRead(scope.$index)">X</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane
                            v-bind:class="{ active: isActive }"
                            :label="`历史`"
                            name="second"
                        >
                            <template v-if="message === 'second'">
                                <el-table :data="read" :show-header="false">
                                    <el-table-column>
                                        <template slot-scope="scope">
                                            <span class="message-title">{{scope.row.title}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="date"></el-table-column>
                                    <el-table-column width="80"></el-table-column>
                                </el-table>
                            </template>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <!-- 聊天界面 -->
            <div class="Interface">
                <div>
                    <header class="list-head-right">
                        <div class="list-chart">
                            <img
                                src="http://pic.51yuansu.com/pic3/cover/02/79/99/5a4b45c6d70f4_610.jpg"
                            />
                        </div>
                        <div class="Tourist">
                            <i class="el-icon-lx-mobilefill"></i>
                            <span>游客</span>
                            <p>在线</p>
                        </div>
                        <div class="Transfer-Close">
                            <div>
                                <img src="../../assets/img/liebiao-zhuanjie.png" alt />
                                <p>客服转接</p>
                            </div>
                            <div>
                                <img src="../../assets/img/huabanfuben.png" alt />
                                <p>关闭会话</p>
                            </div>
                        </div>
                    </header>
                </div>
                <div></div>
                <button class="Send-out" type="buttom">发送</button>
                <div class="edit" ref="editorElem" style="text-align:left;"></div>
            </div>
        </div>
    </div>
</template>
<script>
import E from 'wangeditor';
export default {
    name: 'Editor',
    data() {
        return {
            editor: null,
            editorContent: '', //富文本值
            message: 'first', //绑定值
            showHeader: false,
            unread: [
                //会话
                {
                    date: ' 20:00:00',
                    title: '张三'
                },
                {
                    date: ' 21:00:00',
                    title: '李四'
                }
            ],
            read: [
                //历史记录
                {
                    date: ' 20:00:00',
                    title: '王五'
                }
            ],
            isActive: true
        };
    },
    // catchData是一个类似回调函数，来自父组件，当然也可以自己写一个函数，主要是用来获取富文本编辑器中的html内容用来传递给服务端
    props: ['catchData'], // 接收父组件的方法
    mounted() {
        this.editor = new E(this.$refs.editorElem);
        // 编辑器的事件，每次改变会获取其html内容
        this.editor.customConfig.onchange = html => {
            this.editorContent = html;
            this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
        };
        this.editor.customConfig.menus = [
            // 菜单配置
            'emoticon', // 表情
            'link', // 插入链接
            'image' // 插入图片
        ];
        this.editor.create(); // 创建富文本实例
    },
    methods: {
        //移入历史记录
        handleRead(index) {
            const item = this.unread.splice(index, 1);
            console.log(item);
            this.read = item.concat(this.read);
        },
        handleDel(index) {
            const item = this.read.splice(index, 1);
            this.recycle = item.concat(this.recycle);
        },
        handleRestore(index) {
            const item = this.recycle.splice(index, 1);
            this.read = item.concat(this.read);
        }
    }
};
</script>
<style scoped>
.active {
    width: 100%;
    padding: 0;
    text-align: center;
}
#wangeditor {
    width: 1260px;
    height: 700px;
    position: relative;
    background-color: rgb(255, 255, 255);
}
/*会话列表 */
.SessionList {
    width: 300px;
    height: 700px;
    float: left;
    border-right: 1px solid rgb(199, 199, 199);
}
.list-head-left {
    width: 100%;
    height: 100px;
    border-bottom: 1px solid rgb(219, 219, 219);
}
.list-chart {
    width: 70px;
    height: 70px;
    overflow: hidden;
    padding: 10px;
    float: left;
}
.list-chart img {
    width: 100%;
    height: 70px;
}
.Choice {
    padding: 20px;
    float: left;
}
.Choice span {
    color: darkgray;
}
.state {
    margin-top: 20px;
    width: 80px;
}
/*聊天界面 */
.Interface {
    width: 950px;
    height: 700px;
    float: left;
}
.list-head-right {
    width: 100%;
    height: 100px;
    border-bottom: 1px solid rgb(219, 219, 219);
}
.list-head-right img {
    border-radius: 50%;
}
.Tourist {
    padding: 20px;
    float: left;
}
.Tourist span {
    padding-left: 10px;
}
.Tourist p {
    padding-top: 15px;
    color: rgb(0, 255, 21);
}
.Transfer-Close {
    float: right;
}
.Transfer-Close div {
    width: 70px;
    float: left;
    margin: 10px 10px;
    color: #20a0ff;
    font-size: 15px;
}
.Transfer-Close img {
    width: 60%;
    margin: 5px 5px 5px 7px;
}
.edit {
    width: 950px;
    height: 200px;
    position: absolute;
    bottom: 0;
}
.Send-out {
    width: 10%;
    height: 30px;
    background-color: #20a0ff;
    color: aliceblue;
    border: 0;
    position: absolute;
    right: 10px;
    bottom: 5px;
    z-index: 100000000;
}
</style>