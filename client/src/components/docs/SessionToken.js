import '../../styles/docco.css'

export default function SessionToken() {
  return (
    <div id="container">
      <div id="background" />
      <ul className="sections">
        <li id="title">
          <div className="annotation">
            <h1>Checkr Embed authentication flow</h1>
          </div>
        </li>
        <li id="section-1">
          <div className="annotation">
            <div className="sswrap">
              <a className="ss" href="#section-1">
                §
              </a>
            </div>
          </div>
          <div className="content">
            <div className="highlight">
              <pre>
                <span className="hljs-keyword">import</span> express{' '}
                <span className="hljs-keyword">from</span>{' '}
                <span className="hljs-string">'express'</span>
                {'\n'}
                <span className="hljs-keyword">import</span> fetch{' '}
                <span className="hljs-keyword">from</span>{' '}
                <span className="hljs-string">'node-fetch'</span>
                {'\n'}
                <span className="hljs-keyword">import</span> database{' '}
                <span className="hljs-keyword">from</span>{' '}
                <span className="hljs-string">'../db.js'</span>
                {'\n'}
                <span className="hljs-keyword">import</span> jwt{' '}
                <span className="hljs-keyword">from</span>{' '}
                <span className="hljs-string">'jsonwebtoken'</span>
                {'\n'}
                <span className="hljs-keyword">import</span> bearerToken{' '}
                <span className="hljs-keyword">from</span>{' '}
                <span className="hljs-string">'express-bearer-token'</span>
                {'\n'}
                <span className="hljs-keyword">import</span> {'{'}decrypt,
                parseJSON
                {'}'} <span className="hljs-keyword">from</span>{' '}
                <span className="hljs-string">'../helpers/index.js'</span>
                {'\n'}
                {'\n'}
                <span className="hljs-keyword">const</span> sessionTokensRouter
                = express.<span className="hljs-title class_">Router</span>().
                <span className="hljs-title function_">use</span>(
                <span className="hljs-title function_">bearerToken</span>())
                {'\n'}
                <span className="hljs-keyword">const</span> apiHost = process.
                <span className="hljs-property">env</span>.
                <span className="hljs-property">CHECKR_API_URL</span>
              </pre>
            </div>
          </div>
        </li>
        <li id="section-2">
          <div className="annotation">
            <div className="sswrap">
              <a className="ss" href="#section-2">
                §
              </a>
            </div>
            <h2 id="initial-setup">Initial Setup</h2>
          </div>
        </li>
        <li id="section-3">
          <div className="annotation">
            <div className="sswrap">
              <a className="ss" href="#section-3">
                §
              </a>
            </div>
          </div>
        </li>
        <li id="section-4">
          <div className="annotation">
            <div className="sswrap">
              <a className="ss" href="#section-4">
                §
              </a>
            </div>
            <p>
              Setup a private endpoint to handle session token requests to{' '}
              <strong>Checkr</strong>, If you are using <code>embeds</code> we
              will specify this endpoint in the <code>sessionTokenPath</code>{' '}
              property. Make sure to complete your application’s user{' '}
              <strong>authentication</strong> and <strong>authorization</strong>{' '}
              before responding to the request.
            </p>
          </div>
          <div className="content">
            <div className="highlight">
              <pre>
                sessionTokensRouter.
                <span className="hljs-title function_">post</span>(
                <span className="hljs-string">'/api/session-tokens'</span>,{' '}
                <span className="hljs-keyword">async</span> (req, res) =&gt;{' '}
                {'{'}
                {'\n'}
                {'  '}
                <span className="hljs-keyword">if</span> (!
                <span className="hljs-title function_">validBearerToken</span>
                (req.
                <span className="hljs-property">token</span>)) {'{'}
                {'\n'}
                {'    '}res.<span className="hljs-title function_">status</span>
                (<span className="hljs-number">401</span>).
                <span className="hljs-title function_">send</span>({'{'}
                {'\n'}
                {'      '}
                <span className="hljs-attr">errors</span>: {'{'}
                {'\n'}
                {'        '}
                <span className="hljs-attr">authentication</span>: [
                <span className="hljs-string">'Authentication failed'</span>],
                {'\n'}
                {'      '}
                {'}'},{'\n'}
                {'    '}
                {'}'}){'\n'}
                {'\n'}
                {'    '}
                <span className="hljs-keyword">return</span>
                {'\n'}
                {'  '}
                {'}'}
                {'\n'}
                {'\n'}
                {'  '}
                <span className="hljs-keyword">const</span> db ={' '}
                <span className="hljs-keyword">await</span>{' '}
                <span className="hljs-title function_">database</span>(){'\n'}
                {'  '}
                <span className="hljs-keyword">const</span> account = db.
                <span className="hljs-property">data</span>.
                <span className="hljs-property">accounts</span>[
                <span className="hljs-number">0</span>]{'\n'}
                {'  '}
                <span className="hljs-keyword">const</span> oauthToken =
                account.
                <span className="hljs-property">checkrAccount</span>
                {'\n'}
                {'    '}? <span className="hljs-title function_">decrypt</span>
                (account.<span className="hljs-property">checkrAccount</span>.
                <span className="hljs-property">accessToken</span>){'\n'}
                {'    '}: <span className="hljs-literal">null</span>
                {'\n'}
                {'  '}
                <span className="hljs-keyword">const</span> credentials ={' '}
                <span className="hljs-title class_">Buffer</span>.
                <span className="hljs-title function_">from</span>(
                <span className="hljs-string">
                  `
                  <span className="hljs-subst">
                    ${'{'}oauthToken{'}'}
                  </span>
                  :`
                </span>
                ).<span className="hljs-title function_">toString</span>(
                <span className="hljs-string">'base64'</span>)
              </pre>
            </div>
          </div>
        </li>
        <li id="section-5">
          <div className="annotation">
            <div className="sswrap">
              <a className="ss" href="#section-5">
                §
              </a>
            </div>
            <h2 id="send-a-request-for-a-session-token-from-your-backend-to-checkr">
              Send a request for a Session Token from your backend to Checkr
            </h2>
          </div>
        </li>
        <li id="section-6">
          <div className="annotation">
            <div className="sswrap">
              <a className="ss" href="#section-6">
                §
              </a>
            </div>
          </div>
        </li>
        <li id="section-7">
          <div className="annotation">
            <div className="sswrap">
              <a className="ss" href="#section-7">
                §
              </a>
            </div>
            <p>
              Partner developers, building partner applications use the OAuth
              access token acquired through Checkr OAuth to request session
              tokens. This is a pre-requisite for using <code>embeds</code>.
            </p>
          </div>
          <div className="content">
            <div className="highlight">
              <pre>
                {'  '}
                <span className="hljs-keyword">const</span> response ={' '}
                <span className="hljs-keyword">await</span>{' '}
                <span className="hljs-title function_">fetch</span>(
                <span className="hljs-string">
                  `
                  <span className="hljs-subst">
                    ${'{'}apiHost{'}'}
                  </span>
                  /web_sdk/session_tokens`
                </span>
                , {'{'}
                {'\n'}
                {'    '}
                <span className="hljs-attr">headers</span>: {'{'}
                {'\n'}
                {'      '}
                <span className="hljs-string">'Content-Type'</span>:{' '}
                <span className="hljs-string">'application/json'</span>,
              </pre>
            </div>
          </div>
        </li>
        <li id="section-8">
          <div className="annotation">
            <div className="sswrap">
              <a className="ss" href="#section-8">
                §
              </a>
            </div>
            <p>
              Pass the OAuth token using <code>Basic Authorization</code> as the{' '}
              <strong>username</strong> with an empty <strong>password</strong>
            </p>
          </div>
          <div className="content">
            <div className="highlight">
              <pre>
                {'      '}
                <span className="hljs-title class_">Authorization</span>:{' '}
                <span className="hljs-string">
                  `Basic{' '}
                  <span className="hljs-subst">
                    ${'{'}credentials{'}'}
                  </span>
                  `
                </span>
                ,{'\n'}
                {'    '}
                {'}'},{'\n'}
                {'    '}
                <span className="hljs-attr">method</span>:{' '}
                <span className="hljs-string">'POST'</span>,{'\n'}
                {'    '}
                <span className="hljs-attr">body</span>:{' '}
                <span className="hljs-title class_">JSON</span>.
                <span className="hljs-title function_">stringify</span>({'{'}
              </pre>
            </div>
          </div>
        </li>
        <li id="section-9">
          <div className="annotation">
            <div className="sswrap">
              <a className="ss" href="#section-9">
                §
              </a>
            </div>
            <p>
              For partner requests, send <code>scopes: ['order']</code> as the
              JSON payload
            </p>
          </div>
          <div className="content">
            <div className="highlight">
              <pre>
                {'      '}
                <span className="hljs-attr">scopes</span>: [
                <span className="hljs-string">'order'</span>],{'\n'}
                {'    '}
                {'}'}),{'\n'}
                {'  '}
                {'}'}){'\n'}
                {'\n'}
                {'  '}
                <span className="hljs-keyword">const</span> jsonBody ={' '}
                <span className="hljs-keyword">await</span>{' '}
                <span className="hljs-title function_">parseJSON</span>
                (response)
              </pre>
            </div>
          </div>
        </li>
        <li id="section-10">
          <div className="annotation">
            <div className="sswrap">
              <a className="ss" href="#section-10">
                §
              </a>
            </div>
            <h2 id="checkr-responds-to-your-backend-with-a-session-token">
              Checkr responds to your backend with a Session Token
            </h2>
          </div>
        </li>
        <li id="section-11">
          <div className="annotation">
            <div className="sswrap">
              <a className="ss" href="#section-11">
                §
              </a>
            </div>
          </div>
        </li>
        <li id="section-12">
          <div className="annotation">
            <div className="sswrap">
              <a className="ss" href="#section-12">
                §
              </a>
            </div>
            <p>
              Upon a successful request Checkr will respond with the following
              payload
            </p>
            <pre>
              <code>
                {'{'}
                {'\n'}
                {'  '}
                <span className="hljs-attr">token</span>:
                &lt;some-token-value&gt;
                {'\n'}
                {'}'}
                {'\n'}
              </code>
            </pre>
          </div>
          <div className="content">
            <div className="highlight">
              <pre>
                {'  '}
                <span className="hljs-keyword">if</span> (!response.
                <span className="hljs-property">ok</span>) {'{'}
                {'\n'}
                {'    '}res.<span className="hljs-title function_">status</span>
                (response.<span className="hljs-property">status</span>).
                <span className="hljs-title function_">send</span>(jsonBody)
                {'\n'}
                {'  '}
                {'}'} <span className="hljs-keyword">else</span> {'{'}
                {'\n'}
                {'    '}res.<span className="hljs-title function_">send</span>
                (jsonBody){'\n'}
                {'  '}
                {'}'}
                {'\n'}
                {'}'}){'\n'}
                {'\n'}
                <span className="hljs-keyword">const</span>{' '}
                <span className="hljs-title function_">validBearerToken</span> =
                token =&gt; {'{'}
                {'\n'}
                {'  '}
                <span className="hljs-keyword">try</span> {'{'}
                {'\n'}
                {'    '}
                <span className="hljs-keyword">return</span> jwt.
                <span className="hljs-title function_">verify</span>(token,{' '}
                <span className="hljs-string">'supersecret'</span>){'\n'}
                {'  '}
                {'}'} <span className="hljs-keyword">catch</span> {'{'}
                {'\n'}
                {'    '}
                <span className="hljs-keyword">return</span>{' '}
                <span className="hljs-literal">false</span>
                {'\n'}
                {'  '}
                {'}'}
                {'\n'}
                {'}'}
                {'\n'}
                {'\n'}
                <span className="hljs-keyword">export</span>{' '}
                <span className="hljs-keyword">default</span>{' '}
                sessionTokensRouter
              </pre>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}
