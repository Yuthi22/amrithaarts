/* Amritha School of Dance — landing page behaviour.
   Plain JavaScript: no frameworks, no build step, nothing to install. */
;(function () {
  'use strict'

  /* ==================================================================
     Settings you can edit
     ================================================================== */

  /** WhatsApp number in international format, digits only. */
  var WHATSAPP_NUMBER = '94716413221'

  /** Paste the student LMS address here. While empty, "Connect LMS" shows a "coming soon" notice. */
  var LMS_URL = ''

  /** How long each hero image stays on screen, in milliseconds (4000 = 4 seconds). */
  var HERO_INTERVAL = 4000

  /** Text shown in the "View Classes" popup. */
  var CLASSES = {
    eastern: {
      title: 'Eastern',
      image: 'assets/images/class-eastern.jpg',
      imagePosition: '60% 20%',
      imageAlt: 'Eastern dancer in a red and gold costume performing a graceful pose',
      medium: 'Sinhala & English',
      ages: '3 – 18',
      agesNote: 'After A/L, Adults & Teachers',
      intro:
        'Discover the grace, rhythm and storytelling of Eastern dance. Students build a strong foundation in Sri Lankan traditional dance through theory, practical training and exam-focused paper classes.',
      modules: {
        theory: {
          summary:
            'Understand the history, principles and terminology behind Eastern dance and the cultural background of each form.',
          points: ['History & cultural background', 'Rhythm, terminology and principles', 'Knowledge behind each dance form'],
        },
        practical: {
          summary:
            'Guided practice in posture, footwork, hand gestures and expression, progressing to complete dance items and stage performance.',
          points: ['Posture, footwork & hand gestures', 'Complete dance items', 'Rehearsals & stage performance'],
        },
        paper: {
          summary: 'Focused written-paper practice and revision that prepares students confidently for their examinations.',
          points: ['Past-paper practice', 'Model answers & revision', 'Exam preparation'],
        },
      },
    },
    ballet: {
      title: 'Ballet',
      image: 'assets/images/class-ballet.jpg',
      imagePosition: '10% 20%',
      imageAlt: 'Ballerina in a white tutu performing an arabesque',
      medium: 'Sinhala & English',
      ages: '3 – 18',
      agesNote: 'After A/L, Adults & Teachers',
      intro:
        'Develop poise, strength and musicality through classical ballet. Lessons combine technique, theory and written practice in a supportive, encouraging environment.',
      modules: {
        theory: {
          summary: 'Learn ballet history, French terminology and the principles behind correct technique.',
          points: ['Ballet history & terminology', 'Technique principles', 'Music and rhythm awareness'],
        },
        practical: {
          summary: 'Barre and centre work that builds posture, flexibility and control, leading to choreographed pieces.',
          points: ['Barre & centre work', 'Turns, jumps & flexibility', 'Choreography & performance'],
        },
        paper: {
          summary: 'Structured written-paper practice and revision for ballet theory examinations.',
          points: ['Past-paper practice', 'Model answers & revision', 'Exam preparation'],
        },
      },
    },
  }

  /* ==================================================================
     Helpers
     ================================================================== */

  var TABS = ['theory', 'practical', 'paper']
  var SECTIONS = ['home', 'about', 'classes', 'gallery', 'contact']
  var root = document.documentElement

  function $(selector, scope) {
    return (scope || document).querySelector(selector)
  }

  function $$(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector))
  }

  function whatsappLink(message) {
    var base = 'https://wa.me/' + WHATSAPP_NUMBER
    return message ? base + '?text=' + encodeURIComponent(message) : base
  }

  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    })
  }

  function icon(name, strokeWidth) {
    var style = strokeWidth ? ' style="--sw: ' + strokeWidth + '"' : ''
    return '<svg class="icon"' + style + ' viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><use href="#i-' + name + '" /></svg>'
  }

  function restartAnimation(el) {
    el.style.animation = 'none'
    void el.offsetWidth
    el.style.animation = ''
  }

  /* ==================================================================
     Header: solid background after scrolling + highlight current section
     ================================================================== */

  var header = $('.site-header')
  var navLinks = $$('.main-nav a, .mobile-menu nav a')
  var activeSection = ''

  function updateHeader() {
    header.classList.toggle('is-scrolled', window.scrollY > 24)
  }

  function updateActiveSection() {
    var current = SECTIONS[0]
    if (window.innerHeight + window.scrollY >= root.scrollHeight - 4) {
      current = SECTIONS[SECTIONS.length - 1]
    } else {
      var line = 120 + window.innerHeight * 0.25
      SECTIONS.forEach(function (id) {
        var el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      })
    }
    if (current === activeSection) return
    activeSection = current
    navLinks.forEach(function (link) {
      var on = link.getAttribute('href') === '#' + current
      link.classList.toggle('is-active', on)
      if (on) link.setAttribute('aria-current', 'true')
      else link.removeAttribute('aria-current')
    })
  }

  var scrollQueued = false
  window.addEventListener(
    'scroll',
    function () {
      if (scrollQueued) return
      scrollQueued = true
      requestAnimationFrame(function () {
        scrollQueued = false
        updateHeader()
        updateActiveSection()
      })
    },
    { passive: true },
  )
  window.addEventListener('resize', updateActiveSection)
  updateHeader()
  updateActiveSection()

  /* ==================================================================
     Hero slideshow
     ================================================================== */

  var heroSlides = $$('.hero__slide')
  var heroPause = $('.hero__pause')
  var heroIndex = 0
  var heroTimer = null
  var heroPaused = false
  var heroChangedAt = 0

  function showHeroSlide(i) {
    var next = (i + heroSlides.length) % heroSlides.length
    if (next === heroIndex) return
    var prev = heroSlides[heroIndex]

    heroSlides.forEach(function (slide) {
      slide.classList.remove('was-active')
    })
    // Keep the old image visible underneath while the new one fades in
    prev.classList.remove('is-active')
    prev.classList.add('was-active')
    prev.setAttribute('aria-hidden', 'true')
    heroSlides[next].classList.add('is-active')
    heroSlides[next].removeAttribute('aria-hidden')

    heroIndex = next
    heroChangedAt = Date.now()
    setTimeout(function () {
      prev.classList.remove('was-active')
    }, 1200)
  }

  function scheduleHero() {
    clearTimeout(heroTimer)
    if (heroPaused || document.hidden || heroSlides.length < 2) return
    heroTimer = setTimeout(function () {
      showHeroSlide(heroIndex + 1)
      scheduleHero()
    }, HERO_INTERVAL)
  }

  function setHeroPaused(paused) {
    heroPaused = paused
    heroPause.setAttribute('aria-pressed', String(paused))
    heroPause.textContent = paused ? 'Play slideshow' : 'Pause slideshow'
    scheduleHero()
  }

  if (heroSlides.length > 1) {
    var hero = $('.hero')

    // Moving the mouse onto the hero shows the next image
    // (ignored while an image is still fading in, so it doesn't flicker)
    hero.addEventListener('mouseenter', function () {
      if (Date.now() - heroChangedAt < 1200) return
      showHeroSlide(heroIndex + 1)
      scheduleHero()
    })

    // Hidden button for keyboard users (appears when they press Tab)
    heroPause.addEventListener('click', function () {
      setHeroPaused(!heroPaused)
    })

    // Stop while the browser tab is in the background
    document.addEventListener('visibilitychange', scheduleHero)

    // Swipe left / right on touch screens
    var heroTouch = null
    hero.addEventListener(
      'touchstart',
      function (e) {
        heroTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      },
      { passive: true },
    )
    hero.addEventListener(
      'touchend',
      function (e) {
        if (!heroTouch) return
        var dx = e.changedTouches[0].clientX - heroTouch.x
        var dy = e.changedTouches[0].clientY - heroTouch.y
        heroTouch = null
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
          showHeroSlide(heroIndex + (dx < 0 ? 1 : -1))
          scheduleHero()
        }
      },
      { passive: true },
    )

    setHeroPaused(heroPaused)
  }

  /* ==================================================================
     Mobile menu
     ================================================================== */

  var menu = $('#mobile-menu')
  var menuToggle = $('.menu-toggle')

  function isMenuOpen() {
    return menu.classList.contains('is-open')
  }

  function setMenu(open, restoreFocus) {
    menu.classList.toggle('is-open', open)
    if (open) menu.removeAttribute('inert')
    else menu.setAttribute('inert', '')
    menuToggle.setAttribute('aria-expanded', String(open))
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
    root.classList.toggle('is-locked', open)
    if (open) $('.mobile-menu__close', menu).focus()
    else if (restoreFocus) menuToggle.focus()
  }

  menuToggle.addEventListener('click', function () {
    setMenu(!isMenuOpen())
  })

  $$('[data-close-menu]', menu).forEach(function (el) {
    el.addEventListener('click', function () {
      setMenu(false, true)
    })
  })

  // Links close the menu, then the browser scrolls to the section
  $$('a[href^="#"]', menu).forEach(function (link) {
    link.addEventListener('click', function () {
      setMenu(false)
    })
  })

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isMenuOpen()) setMenu(false, true)
  })

  window.addEventListener('resize', function () {
    if (window.innerWidth > 1024 && isMenuOpen()) setMenu(false)
  })

  /* ==================================================================
     Fade sections in as they scroll into view
     ================================================================== */

  if ('IntersectionObserver' in window) {
    root.classList.add('reveal-ready')
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.05 },
    )
    $$('[data-reveal]').forEach(function (el) {
      revealObserver.observe(el)
    })
  }

  /* ==================================================================
     Popups (native <dialog>: Escape closes, focus is kept inside)
     ================================================================== */

  function openDialog(dialog) {
    if (!dialog.open) dialog.showModal()
  }

  $$('dialog.modal').forEach(function (dialog) {
    // A click on the dialog element itself is a click on the dark backdrop
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) dialog.close()
    })
    $$('[data-close]', dialog).forEach(function (button) {
      button.addEventListener('click', function () {
        dialog.close()
      })
    })
  })

  /* ---------- Class details ---------- */

  var classDialog = $('#class-dialog')
  var classPanel = $('#class-panel')
  var tabButtons = $$('.class-tab', classDialog)
  var currentClass = 'eastern'
  var currentTab = 'theory'

  function field(name) {
    return $('[data-field="' + name + '"]', classDialog)
  }

  function showTab(tab, moveFocus) {
    var info = CLASSES[currentClass]
    var module = info.modules[tab]
    currentTab = tab

    tabButtons.forEach(function (button) {
      var on = button.getAttribute('data-tab') === tab
      button.classList.toggle('is-active', on)
      button.setAttribute('aria-selected', String(on))
      button.tabIndex = on ? 0 : -1
      if (on && moveFocus) button.focus()
    })

    classPanel.setAttribute('aria-labelledby', 'tab-' + tab)
    field('summary').textContent = module.summary
    field('points').innerHTML = module.points
      .map(function (point) {
        return '<li>' + icon('check', 2.2) + ' ' + escapeHtml(point) + '</li>'
      })
      .join('')
    restartAnimation(classPanel)

    field('whatsapp').href = whatsappLink(
      'Hello Amritha School of Dance, I would like to know more about the ' + info.title + ' ' + tab + ' classes.',
    )
  }

  function openClass(id, tab) {
    var info = CLASSES[id]
    if (!info) return
    currentClass = id
    field('image').src = info.image
    field('image').alt = info.imageAlt
    field('image').style.objectPosition = info.imagePosition || ''
    field('title').textContent = info.title
    field('intro').textContent = info.intro
    field('medium').textContent = info.medium
    field('ages').textContent = info.ages
    field('agesNote').textContent = info.agesNote
    showTab(tab || 'theory', false)
    classDialog.scrollTop = 0
    openDialog(classDialog)
    if (tab && tab !== 'theory') $('#tab-' + tab).focus()
  }

  tabButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      showTab(button.getAttribute('data-tab'))
    })
  })

  $('.class-tabs', classDialog).addEventListener('keydown', function (e) {
    var i = TABS.indexOf(currentTab)
    var next = null
    if (e.key === 'ArrowRight') next = TABS[(i + 1) % TABS.length]
    if (e.key === 'ArrowLeft') next = TABS[(i - 1 + TABS.length) % TABS.length]
    if (e.key === 'Home') next = TABS[0]
    if (e.key === 'End') next = TABS[TABS.length - 1]
    if (next) {
      e.preventDefault()
      showTab(next, true)
    }
  })

  /* ---------- Gallery + photo viewer ---------- */

  var galleryDialog = $('#gallery-dialog')
  var lightbox = $('#lightbox')
  var lbFigure = $('.lightbox__figure', lightbox)
  var lbImage = $('img', lbFigure)
  var lbCaption = $('.lightbox__caption', lightbox)
  var lbCount = $('.lightbox__count', lightbox)
  var lbStrip = $('.lightbox__strip', lightbox)

  // The photo list comes from the gallery popup in index.html
  var photos = $$('.gallery-grid__item', galleryDialog).map(function (button) {
    var img = $('img', button)
    return { src: img.getAttribute('src'), alt: img.alt, caption: $('.gallery-grid__caption', button).textContent.trim() }
  })
  var photoIndex = 0

  lbStrip.innerHTML = photos
    .map(function (photo, i) {
      return (
        '<li><button type="button" class="lightbox__thumb" data-index="' + i + '" aria-label="Show photo ' + (i + 1) + ': ' +
        escapeHtml(photo.caption) + '"><img src="' + escapeHtml(photo.src) + '" alt="" loading="lazy" /></button></li>'
      )
    })
    .join('')
  var stripButtons = $$('.lightbox__thumb', lbStrip)

  function showPhoto(i) {
    photoIndex = (i + photos.length) % photos.length
    var photo = photos[photoIndex]
    lbImage.src = photo.src
    lbImage.alt = photo.alt
    lbCaption.textContent = photo.caption
    lbCount.textContent = photoIndex + 1 + ' / ' + photos.length
    restartAnimation(lbFigure)

    stripButtons.forEach(function (button, n) {
      var on = n === photoIndex
      button.classList.toggle('is-active', on)
      if (on) {
        button.setAttribute('aria-current', 'true')
        lbStrip.scrollTo({ left: button.offsetLeft - lbStrip.clientWidth / 2 + button.offsetWidth / 2, behavior: 'smooth' })
      } else {
        button.removeAttribute('aria-current')
      }
    })
  }

  function openPhoto(i) {
    showPhoto(i)
    openDialog(lightbox)
  }

  $$('[data-step]', lightbox).forEach(function (button) {
    button.addEventListener('click', function () {
      showPhoto(photoIndex + Number(button.getAttribute('data-step')))
    })
  })

  lbStrip.addEventListener('click', function (e) {
    var button = e.target.closest('[data-index]')
    if (button) showPhoto(Number(button.getAttribute('data-index')))
  })

  lightbox.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') showPhoto(photoIndex + 1)
    if (e.key === 'ArrowLeft') showPhoto(photoIndex - 1)
  })

  // Swipe left / right on touch screens
  var swipeStartX = null
  var stage = $('.lightbox__stage', lightbox)
  stage.addEventListener('pointerdown', function (e) {
    swipeStartX = e.clientX
  })
  stage.addEventListener('pointerup', function (e) {
    if (swipeStartX === null) return
    var dx = e.clientX - swipeStartX
    swipeStartX = null
    if (Math.abs(dx) > 50) showPhoto(photoIndex + (dx < 0 ? 1 : -1))
  })

  /* ---------- Connect LMS ---------- */

  var lmsDialog = $('#lms-dialog')

  function connectLms() {
    if (isMenuOpen()) setMenu(false)
    if (LMS_URL) window.open(LMS_URL, '_blank', 'noopener,noreferrer')
    else openDialog(lmsDialog)
  }

  /* ---------- Buttons that open popups ---------- */

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-open-class], [data-open-photo], [data-open-gallery], [data-open-lms]')
    if (!trigger) return
    if (trigger.hasAttribute('data-open-class')) openClass(trigger.getAttribute('data-open-class'), trigger.getAttribute('data-tab'))
    else if (trigger.hasAttribute('data-open-photo')) openPhoto(Number(trigger.getAttribute('data-open-photo')))
    else if (trigger.hasAttribute('data-open-gallery')) openDialog(galleryDialog)
    else connectLms()
  })

  /* ---------- Footer year ---------- */

  $$('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear()
  })
})()
