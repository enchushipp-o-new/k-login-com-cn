// public/site-helper.js
(function() {
  'use strict';

  // 配置数据
  const CONFIG = {
    siteUrl: 'https://k-login.com.cn',
    keyword: '开云官网',
    badgeColors: ['#3498db', '#2ecc71', '#e67e22', '#9b59b6', '#1abc9c'],
    tipDuration: 5000
  };

  // 关键词徽章列表
  const KEYWORD_BADGES = [
    { text: '开云官网', color: '#e74c3c', icon: '★' },
    { text: '安全指南', color: '#27ae60', icon: '✓' },
    { text: '帮助中心', color: '#2980b9', icon: '?' },
    { text: '新功能', color: '#8e44ad', icon: '!' },
    { text: '更新日志', color: '#d35400', icon: '→' }
  ];

  // 页面提示卡片数据
  const TIP_DATA = [
    {
      title: '欢迎访问',
      content: '这是 ' + CONFIG.siteUrl + ' 的辅助工具，提供便捷导航。',
      type: 'info'
    },
    {
      title: '使用提示',
      content: '点击徽章可查看 ' + CONFIG.keyword + ' 的相关信息。',
      type: 'warning'
    },
    {
      title: '快速访问',
      content: '可直接前往 ' + CONFIG.siteUrl + ' 获取更多服务。',
      type: 'success'
    }
  ];

  // 工具函数：生成唯一ID
  function generateId(prefix) {
    var random = Math.random().toString(36).substring(2, 8);
    return (prefix || 'el') + '_' + random;
  }

  // 创建样式
  function injectStyles() {
    var style = document.createElement('style');
    style.textContent = [
      '.site-helper-card {',
        'position: fixed;',
        'top: 20px;',
        'right: 20px;',
        'max-width: 320px;',
        'background: #fff;',
        'border-radius: 12px;',
        'box-shadow: 0 4px 20px rgba(0,0,0,0.15);',
        'padding: 16px 20px;',
        'z-index: 9999;',
        'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;',
        'transition: opacity 0.3s ease, transform 0.3s ease;',
        'opacity: 0;',
        'transform: translateY(-10px);',
      '}',
      '.site-helper-card.visible {',
        'opacity: 1;',
        'transform: translateY(0);',
      '}',
      '.site-helper-card .card-title {',
        'font-size: 16px;',
        'font-weight: 600;',
        'margin-bottom: 8px;',
        'color: #2c3e50;',
      '}',
      '.site-helper-card .card-content {',
        'font-size: 14px;',
        'line-height: 1.5;',
        'color: #555;',
      '}',
      '.site-helper-card .card-close {',
        'position: absolute;',
        'top: 8px;',
        'right: 12px;',
        'cursor: pointer;',
        'font-size: 18px;',
        'color: #999;',
        'background: none;',
        'border: none;',
        'padding: 0 4px;',
      '}',
      '.site-helper-card .card-close:hover {',
        'color: #333;',
      '}',
      '.site-helper-card.info { border-left: 4px solid #3498db; }',
      '.site-helper-card.warning { border-left: 4px solid #f39c12; }',
      '.site-helper-card.success { border-left: 4px solid #27ae60; }',
      '.site-helper-badge-container {',
        'position: fixed;',
        'bottom: 20px;',
        'left: 20px;',
        'z-index: 9999;',
        'display: flex;',
        'flex-wrap: wrap;',
        'gap: 8px;',
        'max-width: 400px;',
      '}',
      '.site-helper-badge {',
        'display: inline-flex;',
        'align-items: center;',
        'gap: 4px;',
        'padding: 6px 14px;',
        'border-radius: 20px;',
        'font-size: 13px;',
        'font-weight: 500;',
        'color: #fff;',
        'cursor: pointer;',
        'transition: transform 0.2s, box-shadow 0.2s;',
        'box-shadow: 0 2px 8px rgba(0,0,0,0.12);',
      '}',
      '.site-helper-badge:hover {',
        'transform: scale(1.05);',
        'box-shadow: 0 4px 12px rgba(0,0,0,0.2);',
      '}',
      '.site-helper-badge .badge-icon {',
        'font-size: 14px;',
      '}',
      '@media (max-width: 600px) {',
        '.site-helper-card {',
          'max-width: 90%;',
          'right: 5%;',
          'top: 10px;',
        '}',
        '.site-helper-badge-container {',
          'left: 10px;',
          'bottom: 10px;',
        '}',
      '}'
    ].join(' ');
    document.head.appendChild(style);
  }

  // 显示提示卡片
  function showTipCard(tip, delay) {
    delay = delay || 0;
    var card = document.createElement('div');
    card.className = 'site-helper-card ' + (tip.type || 'info');
    card.id = generateId('tip');
    card.innerHTML = [
      '<button class="card-close" onclick="this.parentElement.remove()">×</button>',
      '<div class="card-title">' + tip.title + '</div>',
      '<div class="card-content">' + tip.content + '</div>'
    ].join('');
    document.body.appendChild(card);
    setTimeout(function() {
      card.classList.add('visible');
    }, delay);
    setTimeout(function() {
      if (card.parentElement) {
        card.classList.remove('visible');
        setTimeout(function() { card.remove(); }, 300);
      }
    }, CONFIG.tipDuration + delay);
  }

  // 创建关键词徽章
  function createBadge(data) {
    var badge = document.createElement('span');
    badge.className = 'site-helper-badge';
    badge.style.backgroundColor = data.color;
    badge.innerHTML = '<span class="badge-icon">' + data.icon + '</span> ' + data.text;
    badge.addEventListener('click', function() {
      var msg = data.text + ' 相关：' + CONFIG.siteUrl + ' 提供 ' + CONFIG.keyword + ' 服务。';
      alert(msg);
    });
    return badge;
  }

  // 初始化徽章容器
  function initBadges() {
    var container = document.createElement('div');
    container.className = 'site-helper-badge-container';
    container.id = generateId('badgeContainer');
    KEYWORD_BADGES.forEach(function(item) {
      var badge = createBadge(item);
      container.appendChild(badge);
    });
    document.body.appendChild(container);
  }

  // 顺序显示提示卡片
  function showTipsSequence() {
    TIP_DATA.forEach(function(tip, index) {
      showTipCard(tip, index * 2000);
    });
  }

  // 主初始化
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        injectStyles();
        initBadges();
        showTipsSequence();
      });
    } else {
      injectStyles();
      initBadges();
      showTipsSequence();
    }
  }

  // 启动
  init();

})();