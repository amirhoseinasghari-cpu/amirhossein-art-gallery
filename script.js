// ایجاد modal برای نمایش بزرگ عکس‌ها
function createImageModal() {
    // ایجاد عناصر modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = 
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <img class="modal-image" src="" alt="">
            <div class="modal-info">
                <h3 class="modal-title"></h3>
                <p class="modal-description"></p>
                <div class="modal-price"></div>
            </div>
        </div>
    ;
    
    document.body.appendChild(modal);
    
    // اضافه کردن event listener به عکس‌ها
    const artWorks = document.querySelectorAll('.art-work');
    artWorks.forEach(work => {
        work.addEventListener('click', function() {
            const imgSrc = this.querySelector('.art-img').src;
            const title = this.querySelector('.art-title').textContent;
            const description = this.querySelector('.art-description').textContent;
            const price = this.querySelector('.price').textContent;
            
            openModal(imgSrc, title, description, price);
        });
    });
    
    // تابع باز کردن modal
    function openModal(imgSrc, title, description, price) {
        const modal = document.querySelector('.modal');
        const modalImg = modal.querySelector('.modal-image');
        const modalTitle = modal.querySelector('.modal-title');
        const modalDesc = modal.querySelector('.modal-description');
        const modalPrice = modal.querySelector('.modal-price');
        
        modalImg.src = imgSrc;
        modalTitle.textContent = title;
        modalDesc.textContent = description;
        modalPrice.textContent = price;
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // جلوگیری از اسکرول
    }
    
    // بستن modal
    const closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    function closeModal() {
        const modal = document.querySelector('.modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// اجرای تابع وقتی صفحه لود شد
document.addEventListener('DOMContentLoaded', function() {
    createImageModal();
});
// قابلیت فیلتر کردن آثار بر اساس دسته‌بندی
function addFilterFunctionality() {
    // ایجاد دکمه‌های فیلتر (می‌تونی بعداً به UI اضافه کنی)
    const filterButtons = 
        <div class="filter-buttons" style="text-align: center; margin-bottom: 30px;">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="nft">NFT</button>
            <button class="filter-btn" data-filter="digital">Digital Art</button>
        </div>
    ;
    
    document.querySelector('.gallery-section').insertAdjacentHTML('afterbegin', filterButtons);
    
    // استایل دکمه‌های فیلتر
    const style = document.createElement('style');
    style.textContent = `
        .filter-buttons {
            margin-bottom: 30px;
        }
        .filter-btn {
            background: #333;
            color: white;
            border: none;
            padding: 10px 20px;
            margin: 0 5px;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .filter-btn.active,
        .filter-btn:hover {
            background: linear-gradient(135deg, #667eea, #764ba2);
        }
    `;
    document.head.appendChild(style);
    
    // منطق فیلتر کردن
    const filterBtns = document.querySelectorAll('.filter-btn');
    const artWorks = document.querySelectorAll('.art-work');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // حذف کلاس active از همه دکمه‌ها
            filterBtns.forEach(b => b.classList.remove('active'));
            // اضافه کردن کلاس active به دکمه کلیک شده
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            artWorks.forEach(work => {
                if (filter === 'all') {
                    work.style.display = 'block';
                } else {
                    // اینجا می‌تونی منطق فیلتر رو بر اساس داده‌های واقعی اضافه کنی
                    work.style.display = 'block';
                }
            });
        });
    });
}

// آپدیت تابع اصلی
document.addEventListener('DOMContentLoaded', function() {
    createImageModal();
    addFilterFunctionality();
});