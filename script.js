// ===== Navbar scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Hamburger =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
}));

// ===== Typing effect =====
const roles = ['Java Developer', 'Backend Developer', 'Spring Boot Specialist', 'Problem Solver'];
const typed = document.getElementById('typed');
let rIdx = 0, cIdx = 0, deleting = false;
function type() {
  const current = roles[rIdx];
  typed.textContent = current.slice(0, cIdx);
  if (!deleting && cIdx < current.length) { cIdx++; setTimeout(type, 90); }
  else if (deleting && cIdx > 0) { cIdx--; setTimeout(type, 50); }
  else {
    deleting = !deleting;
    if (!deleting) rIdx = (rIdx + 1) % roles.length;
    setTimeout(type, deleting ? 1500 : 300);
  }
}
type();

// ===== Reveal on scroll =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== Ripple =====
document.querySelectorAll('.ripple').forEach(btn => {
  btn.addEventListener('click', function(e){
    const r = document.createElement('span');
    r.className = 'ripple-effect';
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    r.style.width = r.style.height = size + 'px';
    r.style.left = (e.clientX - rect.left - size/2) + 'px';
    r.style.top = (e.clientY - rect.top - size/2) + 'px';
    this.appendChild(r);
    setTimeout(() => r.remove(), 600);
  });
});

const projectData = {

 training: {
    title: 'Depple Soft Training Center',

    desc: 'Completed intensive Java Development training with strong focus on backend technologies, database integration, and real-world web application development.',

    duration: '6 Months Professional Training',

    features: [
      'Strong foundation in Core Java and OOP concepts',
      'Hands-on experience with JDBC for database connectivity',
      'Developed dynamic web applications using JSP & Servlet',
      'Worked with Hibernate ORM for database mapping',
      'Built REST APIs using Spring Boot',
      'Understanding of MVC architecture',
      'Form handling and session management',
      'CRUD operations with MySQL database'
    ],

    topics: [
      'Core Java (OOP, Collections, Exception Handling, Multithreading)',
      'Advanced Java (JSP, Servlet)',
      'JDBC (Database Connectivity)',
      'Hibernate (ORM Framework)',
      'Spring Boot (REST API Development)',
      'HTML, CSS, JavaScript (Frontend basics)',
      'MVC Architecture',
      'Session & Cookie Management'
    ],

    tools: [
      'Eclipse / IntelliJ IDEA',
      'MySQL Workbench',
      'Apache Tomcat Server',
      'Postman (API Testing)',
      'Git (Version Control)'
    ],

    tech: 'Core Java, Advanced Java, JDBC, JSP, Servlet, Hibernate, Spring Boot, MySQL, HTML, CSS, JavaScript'
  },

  ecommerce: {
    title: 'E-commerce Website',
    desc: 'A dynamic e-commerce web application designed for a smooth shopping experience with multi-level product filtering and real-time database integration.',
    features: [
      'Category, subcategory & third-category filtering',
      'Add to cart & wishlist functionality',
      'User authentication & session management',
      'MySQL database integration',
      'Responsive product catalog'
    ],
    tech: 'Java, JSP, Servlet, MySQL, Ajax Call, HTML, CSS, JavaScript'
  },

  tour: {
    title: 'Tour Management System',
    desc: 'A full-stack web application for managing tour packages and bookings, developed using a Hibernate-based Java backend and a modern React frontend.',
    features: [
      'Tour package management',
      'Booking and reservation system',
      'User authentication and login',
      'Database integration using Hibernate ORM',
      'Responsive user interface built with React'
    ],
    tech: 'Frontend: React JS | Backend: Java, Hibernate, Spring Boot | Database: MySQL | APIs: REST APIs'
  },

  park: {
    title: 'Park Ticketing Management System',
    desc: 'A web-based application for managing park ticket bookings and visitor entry operations with automated pricing and administrative control features.',
    features: [
      'Online ticket booking system',
      'Automated price calculation',
      'Visitor entry and management',
      'Admin control panel',
      'Reporting and dashboard system'
    ],
    tech: 'Frontend: React JS | Backend: Java, Spring Boot, Spring Data JPA, Hibernate | Database: MySQL | APIs: REST APIs'
  }
};
const projectModal = document.getElementById('projectModal');
const projectBody = document.getElementById('projectBody');
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const d = projectData[card.dataset.project];
    if (!d) return;
    projectBody.innerHTML = `
      <h3>${d.title}</h3>
      <p>${d.desc}</p>
      <h4 style="color:var(--accent);margin-top:18px;margin-bottom:8px">Key Features</h4>
      <ul class="features">${d.features.map(f=>`<li>${f}</li>`).join('')}</ul>
      <p><strong>Tech Stack:</strong> ${d.tech}</p>`;
    openModal(projectModal);
  });
});

// ===== Contact Modal =====
const contactModal = document.getElementById('contactModal');
['openContact','openContact2','openContact3'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', () => openModal(contactModal));
});

function openModal(m){ m.classList.add('active'); document.body.style.overflow='hidden'; }
function closeModal(m){ m.classList.remove('active'); document.body.style.overflow=''; }

document.querySelectorAll('[data-close]').forEach(btn => {
  btn.addEventListener('click', () => closeModal(btn.closest('.modal')));
});
document.querySelectorAll('.modal').forEach(m => {
  m.addEventListener('click', e => { if (e.target === m) closeModal(m); });
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.querySelectorAll('.modal.active').forEach(closeModal);
});

// // ===== Contact form =====
// const form = document.getElementById('contactForm');
// const success = document.getElementById('formSuccess');
// form.addEventListener('submit', e => {
//   e.preventDefault();
//   success.classList.add('show');
//   form.reset();
//   setTimeout(() => { success.classList.remove('show'); closeModal(contactModal); }, 1800);
// });

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const successMsg = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true; // મોકલતી વખતે બટન બંધ કરી દેશે

            const templateParams = {
                from_name: document.getElementById('userName').value, 
                user_email: document.getElementById('userEmail').value,
                message: document.getElementById('message').value,
                time: new Date().toLocaleString()
            };

            emailjs.send('service_tfx1r48', 'template_fzquv23', templateParams)
                .then(function () {
                    // મેસેજ બટનની નીચે બતાવશે
                    if (successMsg) {
                        successMsg.style.display = "block";
                        
                        // 5 સેકન્ડ પછી મેસેજ ગાયબ થઈ જશે
                        setTimeout(() => {
                            successMsg.style.display = "none";
                        }, 5000);
                    }
                    contactForm.reset();
                }, function (error) {
                    alert("Error: " + JSON.stringify(error));
                })
                .finally(() => {
                    submitBtn.innerText = "Send Message";
                    submitBtn.disabled = false;
                });
        });
    }
});