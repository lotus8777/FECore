function remove(url, data) {
    const con = confirm("确定要删除吗？");
    if (con === true) {
        AjaxSubmit(url, data);
    }
}

function AjaxSubmit(url, data) {
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function (msg) {
            if (msg.status === 1) {
                parent.layer.msg("操作成功！",
                    {
                        icon: 1,
                        time: 2000
                    },
                    function () {
                        if (msg.url !== "" && msg.url.length > 0) {
                            window.location.href = msg.url;
                        }
                    }
                );
            } else {
                parent.layer.msg("操作失败！",
                    {
                        icon: 2,
                        time: 2000
                    });
            }
        },
        error: function () {
            parent.layer.msg("发生错误!",
                {
                    icon: 2,
                    time: 2000
                });
        }
    });
}
//计算时间之间的时间差
function getDays(begin, end) {
    const startTime = new Date(Date.parse(begin.replace(/-/g, "/"))).getTime();
    if (end == null) {
        end = Date.now().getTime();
    }
    const endTime = new Date(Date.parse(end.replace(/-/g, "/"))).getTime();
    const dates = Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24) + 1;
    return dates;
}
function setFrameHeight(frameId) {
    //var navHeight = $("#navbar").height(); //取得父页面导航条对象
    //$(document.body).height(navHeight);
    const ifm = document.getElementById(frameId);
    if (ifm != null) {
        const iframeWin = ifm.contentWindow || ifm.contentDocument.parentWindow;
        if (iframeWin.document.body) {
            $(`#${frameId}`).css("height", iframeWin.document.body.scrollHeight + 50);
        }
    }
}

//function setParentFrameHeight(offset = 50) {
//    if (self.frameElement != null) {

//        const frameId = self.frameElement.getAttribute("id");
//        const frame = $(window.parent.document).find(`#${frameId}`);
//        frame.height(0);
//        const frameHeight = this.document.body.scrollHeight + offset;
//        frame.height(frameHeight); //调整父页面中IFrame的高度为此页面的高度
//    }
//}
//function changeFrameSize(frameId) {
//    const minHeight = 750;
//    const ifm = document.getElementById(frameId);
//    const iframeWin = ifm.contentWindow || ifm.contentDocument.parentWindow;
//    let height = iframeWin.document.body.scrollHeight + 50;
//    if (iframeWin.document.body) {
//        if (height < minHeight) height = minHeight;
//        $(`#${frameId}`).css("height", height);
//    }
//    ifm.width = document.documentElement.clientWidth - 180;
//}
//Json毫秒数字转为日期格式
function convertJsonDate(str) {
    const d = new Date(parseInt(str.substring(6, str.length - 2))); //new Date()
    return d.toLocaleDateString("chinese", { hour12: false });
}

//将JSON日期格式转换为年龄
function convertJsonDateToAge(str) {
    const millisecond = parseInt(str.substr(6, str.length - 2));
    const current = new Date();
    const realtime = current.getTime() - millisecond;
    return Math.floor(realtime / (1000 * 60 * 60 * 24 * 365)) + 1;
}

//计算年龄
function convertDateToAge(str) {
    const start = new Date(str).getTime();
    const stop = new Date().getTime();
    const realTime = stop - start;
    return Math.floor(realTime / (1000 * 60 * 60 * 24 * 365)) + 1;
}

//在数组内查找元素的索引
Array.prototype.indexOf = function (val) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] === val) return i;
    }
    return -1;
};
//删除数组内的一个元素
Array.prototype.remove = function (val) {
    const index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
//不良事件查询病人信息模块
function getPatientInfo(medicalNo, medicalType, token) {
    const data = { "medicalNo": medicalNo, "medicalType": medicalType, '__RequestVerificationToken': token };
    const url = "/AdverseEvent/GetPatientInfo";
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function (msg) {
            if (msg.status === 1) {
                initialPatientInfo(msg.data);
            } else {
                parent.layer.msg("操作失败！",
                    {
                        icon: 2,
                        time: 2000
                    });
            }
        },
        error: function () {
            parent.layer.msg("发生错误!",
                {
                    icon: 2,
                    time: 2000
                });
        }
    });
}
function initialPatientInfo(data) {
    $("#AdverseEvent_MedicalNo").val(data.MedicalNo);
    $("#AdverseEvent_PatientSex").val(data.Sex);
    $("#AdverseEvent_PatientName").val(data.Name);
    $("#AdverseEvent_PatientAge").val(convertJsonDateToAge(data.Birthday));
    $("#AdverseEvent_DepartmentName").val(data.DepartmentName);
    $("#AdverseEvent_DepartmentId").val(data.DepartmentId);
    $("#AdverseEvent_Diagnosis").val(data.Diagnosis);
    $("#AdverseEvent_BedNo").val(data.BedNo);
    $("#AdverseEvent_DoctorName").val(data.Doctorname);
    $("#AdverseEvent_Birthday").val(convertJsonDate(data.Birthday));
    $("#AdverseEvent_DoctorId").val(data.DoctorId);
    $("#AdverseEvent_TreatmentDate").val(data.TreatmentDate);
    $("#AdverseEvent_Contact").val(data.Contact);
    $("#AdverseEvent_PatientDeptName").val(data.DepartmentName);
    $("#AdverseEvent_PatientContact").val(data.Contact);
    $("#AdverseEvent_Nationality").val("汉族");
    //==========================

    $("#MedicalNo").val(data.MedicalNo);
    $("#PatientSex").val(data.Sex);
    $("#PatientName").val(data.Name);
    $("#PatientAge").val(convertJsonDateToAge(data.Birthday));
    $("#DepartmentName").val(data.DepartmentName);
    $("#DepartmentId").val(data.DepartmentId);
    $("#Diagnosis").val(data.Diagnosis);
    $("#BedNo").val(data.BedNo);
    $("#DoctorName").val(data.DoctorName);
    $("#Birthday").val(data.Birthday);
    $("#DoctorId").val(data.DoctorId);
    $("#TreatmentDate").val(convertJsonDate(data.TreatmentDate));
    $("#Contact").val(data.Contact);
    $("#PatientDeptName").val(data.DepartmentName);
    $("#PatientContact").val(data.Contact);
}
//----不良事件-----------begin
//不良事件病人信息赋值模块
function initialPatientInfoOld(data) {
    $("#MedicalNo").val(data.MedicalNo);
    $("#PatientSex").val(data.Sex);
    $("#PatientName").val(data.Name);
    $("#PatientAge").val(convertDateToAge(data.Birthday));
    $("#DepartmentName").val(data.DepartmentName);
    $("#DepartmentId").val(data.DepartmentId);
    $("#Diagnosis").val(data.Diagnosis);
    $("#BedNo").val(data.BedNo);
    $("#DoctorName").val(data.DoctorName);
    $("#Birthday").val(data.Birthday);
    $("#DoctorId").val(data.DoctorId);
    $("#TreatmentDate").val(data.TreatmentDate);
    $("#Contact").val(data.Contact);
    $("#PatientDeptName").val(data.DepartmentName);
    $("#PatientContact").val(data.Contact);
}
function adverseDrugCheckAssignment() {
    ///可能因素赋值
    var factors = "@Model.OtherInfo";
    $("input[type='checkbox'][name='OtherInfo']").each(function () {
        if (factors.indexOf(this.value) >= 0) {
            $(this).attr("checked", "checked");
        }
    });
    const reportProperty = "@Model.ReportProperty";
    $("input[type='checkbox'][name='ReportProperty']").each(function () {
        if (reportProperty.indexOf(this.value) >= 0) {
            $(this).attr("checked", "checked");
        }
    });
}
function initialDrugInfo(data) {
    var subject = "";
    if (i==0) {
        subject = "怀疑用药";
    } else {
        subject = "并用药品";
    }
    $("#drugs").append(
        `<div class="form-group row">
       <label class="col-12 text-center" style="font-size: x-large;color: red;" >${subject}</label>
     </div >
     <hr style="border:1px solid black;" />
      ${data}`
    );
    i++;
}
//获取病人的药品信息
function getPatientDrugs(medicalNo, medicalType, token) {
    const data = { "medicalNo": medicalNo, "medicalType": medicalType, '__RequestVerificationToken': token };
    const url = "/AdverseEvent/GetPatientDrugs";
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function (msg) {
            if (msg.status === 1) {
                $("#drugNo").empty();
                $("#drugNo").append("<option value=0>请选择药品</option>");
                $.each(msg.data,
                    function (i, item) {
                        const value = item.Ypxh + "-" + item.Ypcd;
                        $("#drugNo").append(`<option value="${value}">${item.Ypmc}</option>`);
                    });
            } else {
                parent.layer.msg("操作失败",
                    {
                        icon: 2,
                        time: 2000
                    });
            }
        },
        error: function () {
            parent.layer.msg('发生错误!',
                {
                    icon: 2,
                    time: 2000
                });
        }
    });
}
//获取药品信息
function getDrugInfo(drugInfo) {
    const data = { "drugInfo": drugInfo };
    const url = "/AdverseEvent/GetDrugInfo";
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function (msg) {
            if (msg.status === 1) {
                initialDrugInfo(msg.data);
                $(`#drugNo option[value='${drugInfo}']`).remove();
            } else {
                parent.layer.msg("操作失败！",
                    {
                        icon: 2,
                        time: 2000
                    });
            }
        },
        error: function () {
            parent.layer.msg('发生错误!',
                {
                    icon: 2,
                    time: 2000
                });
        }
    });
}
function changeClassDetails() {
    const classId = `#class${$("#ClassId").val()}`;
    const classValue = $(classId).val();
    $("#classDetails").html(classValue);
}
function changeLevelDetails() {
    const levelId = `#level${$("#LevelId").val()}`;
    const levelValue = $(levelId).val();
    $("#levelDetails").html(levelValue);
}

//----不良事件-----------
function jqueryDataTable(tableId) {
    if (tableId === "" || tableId === undefined) {
        tableId = "table1";
        //$("#table1").DataTable(getDataTableOption());
    }
    $(`#${tableId}`).DataTable(getDataTableOption());
}


//显示所有行
function jqueryFullTable(tableId) {
    $(`#${tableId}`).DataTable(getDataTableFullOption());
}

function getDataTableFullOption()
{
    return {
        // 是否允许检索
        //"searching": true,
        // 是否允许排序
        "ordering": true,
        // 初期排序列
        //"order": [[0,'asc'],[1,'desc']],
        // 是否显示情报 就是"当前显示1/100记录"这个信息
        //"info": true,
        // 是否允许翻页，设成false，翻页按钮不显示
        //"paging": true,
        // 水平滚动条
        //"scrollX": true,
        // 垂直滚动条 
        // 件数选择功能 默认true
        //"lengthChange": true,
        // 件数选择下拉框内容
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "所有"]],
        // 每页的初期件数 用户可以操作lengthMenu上的值覆盖
        "pageLength": -1,
        //翻页按钮样式
        // numbers:数字
        // simple:前一页，后一页
        // simple_numbers:前一页，后一页，数字
        // full:第一页，前一页，后一页，最后页
        //full_numbers:第一页，前一页，后一页，最后页，数字
        //first_last_numbers:第一页，最后页，数字
        "pagingType": "numbers",
        // 行样式应用 指定多个的话，第一行tr的class为strip1，第二行为strip2，第三行为strip3.
        // 第四行以后又开始从strip1循环。。。 如果想指定成斑马条状，这里的class必须指定为2个。
        //"stripeClasses": ['strip1', 'strip2', 'strip3'],
        // 自动列宽
        //"autoWidth": true,
        // 是否表示 "processing" 加载中的信息，这个信息可以修改
        //"processing": true,
        // 每次创建是否销毁以前的DataTable,默认false
        // "destroy": false,
        // 控制表格各种信息的表示位置（比较复杂） 默认:lfrtip
        // 具体参考：https://datatables.net/reference/option/dom
        //"dom": 'lrtip',
        "language": {
            "sProcessing": "处理中...",
            "sLengthMenu": "显示 _MENU_ 项",
            "sZeroRecords": "没有匹配结果",
            "sInfo": "显示第 _START_ 至 _END_ 项，共 _TOTAL_ 项",
            "sInfoEmpty": "显示第 0 至 0 项，共 0 项",
            "sInfoFiltered": "(由 _MAX_ 项过滤)",
            "sInfoPostFix": "",
            "sSearch": "搜索:",
            "sUrl": "",
            "sEmptyTable": "表中数据为空",
            "sLoadingRecords": "载入中...",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            },
            // 排序方式
            "oAria": {
                "sSortAscending": ": 以升序排列",
                "sSortDescending": ": 以降序排列"
            },
            "fnDrawCallback": function () {
                const api = this.api();
                api.column(0).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            }
        }
    }
}

function getDataTableOption() {
    return {
        // 是否允许检索
        //"searching": true,
        // 是否允许排序
        "ordering": true,
        // 初期排序列
        //"order": [[0,'asc'],[1,'desc']],
        // 是否显示情报 就是"当前显示1/100记录"这个信息
        //"info": true,
        // 是否允许翻页，设成false，翻页按钮不显示
        //"paging": true,
        // 水平滚动条
        //"scrollX": true,
        // 垂直滚动条 
        // 件数选择功能 默认true
        //"lengthChange": true,
        // 件数选择下拉框内容
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "所有"]],
        // 每页的初期件数 用户可以操作lengthMenu上的值覆盖
        "pageLength": 10,
        //翻页按钮样式
        // numbers:数字
        // simple:前一页，后一页
        // simple_numbers:前一页，后一页，数字
        // full:第一页，前一页，后一页，最后页
        //full_numbers:第一页，前一页，后一页，最后页，数字
        //first_last_numbers:第一页，最后页，数字
        "pagingType": "numbers",
        // 行样式应用 指定多个的话，第一行tr的class为strip1，第二行为strip2，第三行为strip3.
        // 第四行以后又开始从strip1循环。。。 如果想指定成斑马条状，这里的class必须指定为2个。
        //"stripeClasses": ['strip1', 'strip2', 'strip3'],
        // 自动列宽
        //"autoWidth": true,
        // 是否表示 "processing" 加载中的信息，这个信息可以修改
        //"processing": true,
        // 每次创建是否销毁以前的DataTable,默认false
        // "destroy": false,
        // 控制表格各种信息的表示位置（比较复杂） 默认:lfrtip
        // 具体参考：https://datatables.net/reference/option/dom
        //"dom": 'lrtip',
        "language": {
            "sProcessing": "处理中...",
            "sLengthMenu": "显示 _MENU_ 项",
            "sZeroRecords": "没有匹配结果",
            "sInfo": "显示第 _START_ 至 _END_ 项，共 _TOTAL_ 项",
            "sInfoEmpty": "显示第 0 至 0 项，共 0 项",
            "sInfoFiltered": "(由 _MAX_ 项过滤)",
            "sInfoPostFix": "",
            "sSearch": "搜索:",
            "sUrl": "",
            "sEmptyTable": "表中数据为空",
            "sLoadingRecords": "载入中...",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            },
            // 排序方式
            "oAria": {
                "sSortAscending": ": 以升序排列",
                "sSortDescending": ": 以降序排列"
            },
            "fnDrawCallback": function () {
                const api = this.api();
                api.column(0).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            }
        }
    }
}
//autocomplete学习示例
$("#fcb").autocomplete({
    source: function (request, response) {
        $.ajax({
            type: "GET",
            dataType: 'json',
            url: "../ws/city/" + request.term,
            async: true,
            success: function (data) {
                response($.map(data, function (item, key) {
                    //自有数据如何包装
                    return {
                        label: key,
                        value: item.id_town + "#" + item.id_province
                    }
                }));
            },
            error: function (result) {
                alert("Due to unexpected errors we were unable to load data");
            }
        });
    },
    minLength: 2
});
