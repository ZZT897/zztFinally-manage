import request from '../util/request'

const download = (data) => {
    return request({
        url: '/downloadData',
        method: 'get',
        params: data
    })
}

const getDownloadRequest = async (row) => {
    let res = await download({
        id: row.id,
    });
    if (res) {
        const buf = Buffer.from(res.data.data, "binary");
        let blob = new Blob([buf], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8" }); // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
        let downloadElement = document.createElement("a");
        let href = window.URL.createObjectURL(blob); // 创建下载的链接
        downloadElement.href = href;
        downloadElement.download = `data${res.name}.xlsx`; // 下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); // 点击下载
        document.body.removeChild(downloadElement); // 下载完成移除元素
        window.URL.revokeObjectURL(href); // 释放掉blob对象
        console.log("获取列表数据成功");
        this.$message.success("下载成功！");
    } else {
        this.$message.error("下载失败！");
    }
}


export { getDownloadRequest }
