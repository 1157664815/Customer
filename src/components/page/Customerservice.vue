<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 客服列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>
                <span>搜索</span>
                <el-input v-model="search" placeholder="请输入相关信息" class="handle-input mr10"></el-input>
            </div>
            <el-table
                :data="tables"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column label="ID" type="index" width="65" align="center"></el-table-column>
                <el-table-column prop="name" label="客服账号" align="center"></el-table-column>
                <el-table-column prop="title" label="昵称" align="center"></el-table-column>
                <el-table-column prop="form" label="所属机构" align="center"></el-table-column>
                <el-table-column prop="state" label="在线状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :formatter="formatSex(scope.row,tableData,scope.row.state)"
                            :type="scope.row.state=='在线'?'success':(scope.row.state=='离线'?'danger':'')"
                        >{{scope.row.state}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="timeold"
                    :formatter="formatter"
                    label="上次登录时间"
                    align="center"
                ></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            icon="el-icon-edit"
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            size="mini"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input
                        type="password"
                        v-model="form.pass"
                        autocomplete="off"
                        placeholder="留空则不修改"
                    ></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input
                        type="password"
                        v-model="form.checkPass"
                        autocomplete="off"
                        placeholder="留空则不修改"
                    ></el-input>
                </el-form-item>
                <el-form-item label="所属机构">
                    <el-input v-model="form.form" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Qs from 'qs';
import { fetchData } from '../../api/index';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [
                /*  {
                    id: null,
                    name: null,
                    title: null,
                    form: null,
                    timeold: null,
                    state: null
                } */
            ],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {
                id: null,
                name: null,
                title: null,
                form: null,
                timeold: null,
                state: null
            },
            idx: -1,
            id: -1,
            search: ''
        };
    },
    created() {
        this.$http
            .post(
                '/api/api/user/kefulist',
                Qs.stringify({
                    name: $cookies.get('tokenpa').title,
                    form: $cookies.get('tokenform'),
                    token: $cookies.get('tokenpa').token
                }),
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            )
            .then(obtain => {
                if (obtain.body.code == 200) {
                    this.tableData = obtain.body.data;
                } else {
                    this.$cookies.remove('tokenpa');
                    this.$cookies.remove('tokenpower');
                    this.$cookies.remove('tokenform');
                    this.$message.error({
                        message: '登录状态已过期，请重新登录...',
                        duration: 1000,
                        onClose: function() {
                            console.log(123);
                            window.location = './login';
                            //this.$router.push('/login');
                        }
                    });
                }
            })
            .catch(fail => {
                this.$message.error({
                    message: '服务器请求失败...'
                });
            });
    },
    methods: {
        //判断在线离线
        formatSex: function(row, column, cellValue) {
            //console.log(cellValue);

            if (cellValue == '1') {
                // return '在线';
                row.state = '在线';
            } else if (cellValue == '0') {
                //return '离线';
                row.state = '离线';
            }
        },
        //格式化时间
        formatter: function(row, column, cellValue) {
            //console.log(cellValue);
            var da = cellValue;
            da = new Date(da);
            var year = da.getFullYear() + '-';
            var month = da.getMonth() + 1 + '-';
            var date = da.getDate() + '  ';
            var shi = da.getHours() + ':';
            var fen = da.getMinutes() + '';
            // console.log([year, month, date].join('-'));
            return [year, month, date, shi, fen].join('');
        },

        // 删除操作
        handleDelete(index, row) {
            console.log(index);

            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            console.log(index);
            /* this.form = row;
            console.log((this.form = row)); */
            this.idx = index;

            this.form.id = row.id;
            this.form.name = row.name;
            this.form.title = row.title;
            this.form.form = row.form;
            this.form.timeold = row.timeold;
            this.form.state = row.state;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
            this.form = {
                id: null,
                name: null,
                title: null,
                form: null,
                timeold: null,
                state: null
            };
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    },
    computed: {
        // 模糊搜索
        tables() {
            const search = this.search;
            // console.log(search);
            if (search) {
                // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
                // 注意： filter() 不会对空数组进行检测。
                // 注意： filter() 不会改变原始数组。
                return this.tableData.filter(data => {
                    // some() 方法用于检测数组中的元素是否满足指定条件;
                    // some() 方法会依次执行数组的每个元素：
                    // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
                    // 如果没有满足条件的元素，则返回false。
                    // 注意： some() 不会对空数组进行检测。
                    // 注意： some() 不会改变原始数组。
                    return Object.keys(data).some(key => {
                        // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
                        // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
                        return (
                            String(data[key])
                                .toLowerCase()
                                .indexOf(search) > -1
                        );
                    });
                });
            }
            return this.tableData;
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
