// EmailJS configuration
const EMAILJS_CONFIG = {
    serviceId: 'service_3qwqemy',
    templateId: 'template_3qwqemy', //029780
    publicKey: 'XvtDKlr5MG6iYNyxG'
};

// مدیریت فرم تماس
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('.submit-btn');
    
    // بارگذاری EmailJS
    (function() {
        emailjs.init(EMAILJS_CONFIG.publicKey);
    })();
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        // نمایش حالت loading
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'در حال ارسال...';
        submitBtn.disabled = true;
        
        try {
            // ارسال ایمیل با EmailJS
            const response = await emailjs.sendForm(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                contactForm
            );
            
            // نمایش پیام موفقیت
            showSuccessMessage();
            
            // ریست کردن فرم
            contactForm.reset();
            
        } catch (error) {
            // نمایش پیام خطا
            showErrorMessage('خطا در ارسال پیام. لطفا دوباره تلاش کنید.');
            console.error('EmailJS error:', error);
        } finally {
            // بازگشت به حالت عادی
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
    
    // اعتبارسنجی real-time
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
});

// اعتبارسنجی کامل فرم
function validateForm() {
    const fields = [
        { id: 'name', type: 'text', minLength: 2 },
        { id: 'email', type: 'email' },
        { id: 'subject', type: 'select' },
        { id: 'message', type: 'textarea', minLength: 10 }
    ];
    
    let isValid = true;
    
    fields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!validateField(element)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// اعتبارسنجی فیلدها
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // اعتبارسنجی بر اساس نوع فیلد
    switch(field.type) {
        case 'text':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'نام باید حداقل ۲ حرف باشد';
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'لطفا یک ایمیل معتبر وارد کنید';
            }
            break;
            
        case 'select-one':
            if (!value) {
                isValid = false;
                errorMessage = 'لطفا یک گزینه انتخاب کنید';
            }
            break;
            
        case 'textarea':
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'پیام باید حداقل ۱۰ حرف باشد';
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
        showFieldSuccess(field);
    }
    
    return isValid;
}

// نمایش خطا برای فیلد
function showFieldError(field, message) {
    clearFieldError(field);
    field.style.borderColor = '#ff4757';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#ff4757';
    errorDiv.style.fontSize = '0.8em';
    errorDiv.style.marginTop = '5px';errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

// نمایش موفقیت برای فیلد
function showFieldSuccess(field) {
    field.style.borderColor = '#2ed573';
}

// پاک کردن خطای فیلد
function clearFieldError(field) {
    field.style.borderColor = '#444';
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// نمایش پیام موفقیت
function showSuccessMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.innerHTML = 
        <div class="message-overlay">
            <div class="message-content success">
                <div class="message-icon">✅</div>
                <h3>پیام شما ارسال شد!</h3>
                <p>ظرف ۲۴ ساعت آینده پاسخگو خواهم بود</p>
                <button onclick="closeMessage()" class="message-btn">متوجه شدم</button>
            </div>
        </div>
    ;
    
    document.body.appendChild(messageDiv);
    
    // حذف خودکار پس از ۵ ثانیه
    setTimeout(closeMessage, 5000);
}

// نمایش پیام خطا
function showErrorMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'error-message';
    messageDiv.innerHTML = 
        <div class="message-overlay">
            <div class="message-content error">
                <div class="message-icon">❌</div>
                <h3>خطا در ارسال</h3>
                <p>${message}</p>
                <button onclick="closeMessage()" class="message-btn">بستن</button>
            </div>
        </div>
    ;
    
    document.body.appendChild(messageDiv);
    
    // حذف خودکار پس از ۵ ثانیه
    setTimeout(closeMessage, 5000);
}

// بستن پیام
function closeMessage() {
    const messages = document.querySelectorAll('.success-message, .error-message');
    messages.forEach(msg => {
        if (msg.parentNode) {
            msg.remove();
        }
    });
}

// اضافه کردن استایل‌های پیام
const messageStyles = `
    .message-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .message-content {
        background: #2d2d2d;
        padding: 30px;
        border-radius: 15px;
        text-align: center;
        max-width: 400px;
        width: 90%;
        animation: slideUp 0.3s ease;
    }
    
    .message-content.success {
        border: 2px solid #4CAF50;
    }
    
    .message-content.error {
        border: 2px solid #ff4757;
    }
    
    .message-icon {
        font-size: 3em;
        margin-bottom: 15px;
    }
    
    .message-content h3 {
        margin-bottom: 10px;
        color: inherit;
    }
    
    .message-content.success h3 {
        color: #4CAF50;
    }
    
    .message-content.error h3 {
        color: #ff4757;
    }
    
    .message-content p {
        opacity: 0.8;
        margin-bottom: 20px;
        line-height: 1.5;
    }
    
    .message-btn {
        background: #667eea;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .message-btn:hover {
        background: #764ba2;
        transform: translateY(-2px);
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// اضافه کردن استایل‌ها به صفحه
const styleSheet = document.createElement('style');
styleSheet.textContent = messageStyles;
document.head.appendChild(styleSheet);