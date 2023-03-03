import "./footer.css";

function Footer() {
  return (
    <footer>
      <div className="row">
        <div>
          <a id="logo" href="https://novamerainc.com/" />
        </div>
        <div id="email">
          <img alt="email icon" src="/email.svg" />
          <p>innovation@novamerainc.com</p>
        </div>
        <div id="phone">
          <img alt="phone icon" src="/phone.svg" />
          <p>(365) 977-1561</p>
        </div>
        <a id="twitter">
          <img alt="twitter icon" src="/twitter.svg" />
        </a>
        <a id="linkedin">
          <img alt="linkedin icon" src="/linkedin.svg" />
        </a>
      </div>
      <div className="row">
        <article>
          We develop ‘smart’ technologies and surgical mining methods to
          maximize mineral resource efficiency, increase safety and reduce
          environmental impact.
        </article>
        <div className="links">
          <a>Careers</a> | <a>Terms of use</a> | <a>Privacy Policy</a>
        </div>
      </div>
      <div className="row">
        Website maintained by Munter Westermann Arts & Media
      </div>
    </footer>
  );
}

export default Footer;
