document.addEventListener('DOMContentLoaded', () => {
    const updateTimeEl = document.getElementById('updateTime');
    const countdownEl = document.getElementById('countdown');
    const refreshInterval = 30 * 60 * 1000; // 30 分钟
    let nextUpdate = Date.now() + refreshInterval;

    function updateTime() {
        const now = new Date();
        updateTimeEl.textContent = '数据更新时间: ' + now.toLocaleString();
    }

    function updateCountdown() {
        const diff = nextUpdate - Date.now();
        if (diff <= 0) {
            location.reload();
            return;
        }
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        countdownEl.textContent = `距离下次更新还有 ${minutes}分${seconds}秒`;
    }

    updateTime();
    setInterval(updateCountdown, 1000);

    document.getElementById('refreshBtn').addEventListener('click', () => {
        updateTime();
        nextUpdate = Date.now() + refreshInterval;
    });

    document.getElementById('exportBtn').addEventListener('click', () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet([['示例数据', '值'], ['社群活跃用户', 1320]]);
        XLSX.utils.book_append_sheet(wb, ws, '数据');
        XLSX.writeFile(wb, '导出数据.xlsx');
    });
});
