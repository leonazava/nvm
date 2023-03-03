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
          <a href="mailto:innovation@novamerainc.com">
            innovation@novamerainc.com
          </a>
        </div>
        <div id="phone">
          <img alt="phone icon" src="/phone.svg" />
          <p>(365) 977-1561</p>
        </div>
        <div id="twitter">
          <a href="https://twitter.com/NovameraInc" target="_blank">
            <img alt="twitter icon" src="/twitter.svg" />
          </a>
        </div>
        <div id="linkedin">
          <a href="https://www.linkedin.com/company/novamera/" target="_blank">
            <img alt="linkedin icon" src="/linkedin.svg" />
          </a>
        </div>
      </div>
      <div className="row">
        <article>
          We develop ‘smart’ technologies and surgical mining methods to
          maximize mineral resource efficiency, increase safety and reduce
          environmental impact.
        </article>
        <div className="links">
          <a href="https://novamerainc.com/careers/">Careers</a> |{" "}
          <a href="https://novamerainc.com/terms-and-conditions/">
            Terms of use
          </a>{" "}
          | <a href="https://novamerainc.com/privacy-policy/">Privacy Policy</a>
        </div>
      </div>
      <div className="row">
        Website maintained by Munter Westermann Arts & Media
      </div>
    </footer>
  );
}

export default Footer;
