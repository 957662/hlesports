// 表格导出功能
document.getElementById('exportBtn').addEventListener('click', function() {
    const table = document.getElementById('dataTable');
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(table);
    XLSX.utils.book_append_sheet(wb, ws, "关键指标监控");
    XLSX.writeFile(wb, "华立E-sports项目关键指标监控.xlsx");
    alert('Excel文件导出成功！');
});

// 刷新按钮功能
document.getElementById('refreshBtn').addEventListener('click', function() {
    const btn = this;
    const icon = btn.querySelector('i');
    icon.style.transition = 'transform 0.5s ease';
    icon.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        icon.style.transform = 'rotate(0deg)';
        alert('数据已刷新！');
        updateTime();
        nextUpdate = Date.now() + refreshInterval;
    }, 800);
});

// 图表初始化
window.onload = function() {
    const healthCtx = document.getElementById('healthChart').getContext('2d');
    new Chart(healthCtx, {
        type: 'radar',
        data: {
            labels: ['粉丝增长', '内容产出', '社群活跃', '赛事组织', '产品销售', '培训效果'],
            datasets: [{
                label: '当前状态',
                data: [86, 82, 88, 100, 53, 120],
                fill: true,
                backgroundColor: 'rgba(254, 180, 123, 0.2)',
                borderColor: 'rgb(254, 180, 123)',
                pointBackgroundColor: 'rgb(254, 180, 123)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(254, 180, 123)'
            }, {
                label: '目标值',
                data: [100, 100, 100, 100, 100, 100],
                fill: true,
                backgroundColor: 'rgba(255, 126, 95, 0.2)',
                borderColor: 'rgb(255, 126, 95)',
                pointBackgroundColor: 'rgb(255, 126, 95)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 126, 95)'
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    pointLabels: { color: '#a0a0c0', font: { size: 12 } },
                    ticks: { display: false, stepSize: 20 },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            },
            plugins: { legend: { labels: { color: '#a0a0c0' } } }
        }
    });

    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    new Chart(revenueCtx, {
        type: 'doughnut',
        data: {
            labels: ['1+1体验营', '7天KLG体验营', 'ATC潮服销售', '驾校报名', '专升本报名', '其他产品'],
            datasets: [{
                label: '收入占比',
                data: [89, 3, 2, 4, 1, 1],
                backgroundColor: [
                    'rgba(255, 126, 95, 0.8)',
                    'rgba(254, 180, 123, 0.8)',
                    'rgba(46, 204, 113, 0.8)',
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(155, 89, 182, 0.8)',
                    'rgba(149, 165, 166, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 126, 95, 1)',
                    'rgba(254, 180, 123, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(52, 152, 219, 1)',
                    'rgba(155, 89, 182, 1)',
                    'rgba(149, 165, 166, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: { color: '#a0a0c0', padding: 20, font: { size: 12 } }
                },
                tooltip: {
                    callbacks: { label: ctx => `${ctx.label}: ${ctx.parsed}%` }
                }
            }
        }
    });

    const trendCtx = document.getElementById('trendChart').getContext('2d');
    new Chart(trendCtx, {
        type: 'line',
        data: {
            labels: ['5月', '6月', '7月', '8月', '9月', '10月(预测)'],
            datasets: [{
                label: '社群活跃用户(千)',
                data: [0.8, 1.1, 0.9, 1.3, 1.5, 1.8],
                borderColor: 'rgb(255, 126, 95)',
                backgroundColor: 'rgba(255, 126, 95, 0.1)',
                tension: 0.3,
                fill: true
            }, {
                label: '作品播放量(百万)',
                data: [3.2, 4.5, 5.1, 6.8, 8.2, 10.5],
                borderColor: 'rgb(254, 180, 123)',
                backgroundColor: 'rgba(254, 180, 123, 0.1)',
                tension: 0.3,
                fill: true
            }, {
                label: '销售额(万元)',
                data: [45, 68, 72, 105, 186, 240],
                borderColor: 'rgb(46, 204, 113)',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#a0a0c0' } },
                x: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#a0a0c0' } }
            },
            plugins: { legend: { labels: { color: '#a0a0c0' } } }
        }
    });

    updateTime();
    setInterval(updateCountdown, 1000);
};

// 更新时间和倒计时
const updateTimeEl = document.getElementById('updateTime');
const countdownEl = document.getElementById('countdown');
const refreshInterval = 30 * 60 * 1000;
let nextUpdate = Date.now() + refreshInterval;

function updateTime() {
    const now = new Date();
    updateTimeEl.textContent = '数据更新时间: ' + now.toLocaleString();
}

function updateCountdown() {
    const diff = nextUpdate - Date.now();
    if (diff <= 0) { location.reload(); return; }
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    countdownEl.textContent = `距离下次更新还有 ${minutes}分${seconds}秒`;
}
