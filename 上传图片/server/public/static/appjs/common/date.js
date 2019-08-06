//时间绑定函数 开始时间 结束时间 精确到 日
$('#startDate').datetimepicker({
    language: 'zh-CN',
    format: 'yyyy-mm-dd',
    weekStart: 1,
    autoclose: true,
    minView: 2,
    todayBtn: 1
}).on('changeDate', function (ev) {
    var startDate = $('#startDate').val();
    $('#endDate').datetimepicker('setStartDate', startDate);
    $('#startDate').datetimepicker('hide');
});
$('#endDate').datetimepicker({
    language: 'zh-CN',
    format: 'yyyy-mm-dd',
    weekStart: 1,
    autoclose: true,
    minView: 2,
    todayBtn: 1
}).on('changeDate', function (ev) {
    var endDate = $('#endDate').val();
    $('#startDate').datetimepicker('setEndDate', endDate);
    $('#endDate').datetimepicker('hide');
});

//时间绑定函数 开始时间 结束时间 精确到 分
$('#startDateM').datetimepicker({
    language: 'zh-CN',
    format: 'yyyy-mm-dd hh:ii:ss',
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    forceParse: 0,
    showMeridian: 1
}).on('changeDate', function (ev) {
    var startDate = $('#startDateM').val();
    $('#endDateM').datetimepicker('setStartDate', startDate);
    $('#startDateM').datetimepicker('hide');
});
$('#endDateM').datetimepicker({
    language: 'zh-CN',
    format: 'yyyy-mm-dd hh:ii:ss',
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    forceParse: 0,
    showMeridian: 1
}).on('changeDate', function (ev) {
    var endDate = $('#endDateM').val();
    $('#startDateM').datetimepicker('setEndDate', endDate);
    $('#endDateM').datetimepicker('hide');
});