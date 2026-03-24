import re

with open('style.css', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update font family
text = text.replace("'Outfit', sans-serif", "'Poppins', sans-serif")

# 2. Update logo size
text = text.replace(""".logo {
    font-size: 1.5rem;
    font-weight: 800;""", """.logo {
    font-size: 1.1rem;
    font-weight: 800;""")

# 3. Update nav-links text-transform
text = text.replace(""".nav-links a {
    color: var(--text-main);
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: color 0.3s ease;
}""", """.nav-links a {
    color: var(--text-main);
    text-decoration: none;
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 1px;
    transition: color 0.3s ease;
}

/* Hamburger Menu */
.hamburger {
    display: none;
    flex-direction: column;
    gap: 6px;
    cursor: pointer;
    z-index: 20;
}

.hamburger span {
    width: 28px;
    height: 2px;
    background-color: var(--text-main);
    transition: all 0.3s ease;
    transform-origin: center;
}

.hamburger.active span:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
}
.hamburger.active span:nth-child(2) {
    opacity: 0;
}
.hamburger.active span:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
}""")

# 4. Update mobile media query for nav
text = text.replace("""    .nav-links {
        display: none;
    }""", """    .hamburger {
        display: flex;
    }

    .nav-links {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        right: -100%;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(10px);
        margin: 0;
        gap: 2.5rem;
        transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 15;
    }

    .nav-links.active {
        right: 0;
    }

    .nav-links a {
        font-size: 1.5rem;
    }""")

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(text)

