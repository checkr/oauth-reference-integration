export default function OAuth() {
  return (
    <div id="container">
      <div id="background" />
      <ul className="sections">
        <li id="title">
          <div className="annotation">
            <h1>OAuth</h1>
          </div>
        </li>
        <li id="section-1">
          <div className="annotation">
            <div className="sswrap ">
              <a className="ss" href="#section-1">
                §
              </a>
            </div>
          </div>
          <div className="content">
            <div className="highlight">
              <pre>
                <span className="hljs-keyword">import</span> {'{'}
                <span className="hljs-title class_">Button</span>
                {'}'} <span className="hljs-keyword">from</span>{' '}
                <span className="hljs-string">'react-bootstrap'</span>
              </pre>
            </div>
          </div>
        </li>
        <li id="section-2">
          <div className="annotation">
            <div className="sswrap ">
              <a className="ss" href="#section-2">
                §
              </a>
            </div>
            <h2 id="connect-your-account-to-checkr">
              Connect your account to Checkr
            </h2>
          </div>
        </li>
        <li id="section-3">
          <div className="annotation">
            <div className="sswrap ">
              <a className="ss" href="#section-3">
                §
              </a>
            </div>
            <p>
              The first step to connecting your customer accounts to Checkr is
              to create a <code>CheckrConnectButton</code>. This button will
              redirect your customers to Checkr when they link their account.
            </p>
          </div>
          <div className="content">
            <div className="highlight">
              <pre>
                <span className="hljs-keyword">export</span>{' '}
                <span className="hljs-keyword">default</span>{' '}
                <span className="hljs-keyword">function</span>{' '}
                <span className="hljs-title function_">
                  CheckrConnectButton
                </span>
                (
                <span className="hljs-params">
                  {'{'}accountId{'}'}
                </span>
                ) {'{'}
                {'\n'}
                {'  '}
                <span className="hljs-keyword">const</span>{' '}
                <span className="hljs-title function_">
                  checkrSignupFlowHref
                </span>{' '}
                = accountId =&gt; {'{'}
              </pre>
            </div>
          </div>
        </li>
        <li id="section-4">
          <div className="annotation">
            <div className="sswrap ">
              <a className="ss" href="#section-4">
                §
              </a>
            </div>
            <h2 id="navigate-to-your-partner-applications-sign-up-flow-link">
              Navigate to your Partner Application’s Sign-up flow link
            </h2>
          </div>
        </li>
        <li id="section-5">
          <div className="annotation">
            <div className="sswrap ">
              <a className="ss" href="#section-5">
                §
              </a>
            </div>
            <p>
              Replace this URL with your Sign-up Flow URL from your partner
              application settings. Your partner application settings can be
              found in{' '}
              <a href="https://dashboard.checkrhq-staging.net/account/applications">
                https://dashboard.checkrhq-staging.net/account/applications
              </a>
              .
            </p>
          </div>
          <div className="content">
            <div className="highlight">
              <pre>
                {'    '}
                <span className="hljs-keyword">const</span> signupFlowURL ={' '}
                <span className="hljs-keyword">new</span>{' '}
                <span className="hljs-title function_">URL</span>({'\n'}
                {'      '}
                <span className="hljs-string">
                  'https://partners.checkrhq-staging.net/authorize/b9253dbd0ee97ef54763c1ee/signup'
                </span>
                ,{'\n'}
                {'    '})
              </pre>
            </div>
          </div>
        </li>
        <li id="section-6">
          <div className="annotation">
            <div className="sswrap ">
              <a className="ss" href="#section-6">
                §
              </a>
            </div>
            <p>
              Define a state variable that will help you identify which account
              is connecting to Checkr. In this case, we will use the accountId
              as the state variable. This state value will be used later to
              verify the account connection.
            </p>
          </div>
          <div className="content">
            <div className="highlight">
              <pre>
                {'    '}signupFlowURL.
                <span className="hljs-property">searchParams</span>.
                <span className="hljs-title function_">append</span>(
                <span className="hljs-string">'state'</span>, accountId){'\n'}
                {'    '}
                <span className="hljs-keyword">return</span> signupFlowURL.
                <span className="hljs-property">href</span>
                {'\n'}
                {'  '}
                {'}'}
                {'\n'}
                {'\n'}
                {'  '}
                <span className="hljs-keyword">return</span> ({'\n'}
                {'    '}
                <span className="language-xml">
                  <span className="hljs-tag">
                    &lt;<span className="hljs-name">Button</span>
                    {'\n'}
                    {'      '}
                    <span className="hljs-attr">size</span>=
                    <span className="hljs-string">"lg"</span>
                    {'\n'}
                    {'      '}
                    <span className="hljs-attr">onClick</span>=
                    <span className="hljs-string">{'{'}()</span> =&gt;
                  </span>{' '}
                  {'{'}
                  {'\n'}
                  {'        '}window.location.href =
                  checkrSignupFlowHref(accountId)
                  {'\n'}
                  {'      '}
                  {'}'}
                  {'}'}
                  {'\n'}
                  {'    '}&gt;{'\n'}
                  {'      '}Connect to Checkr{'\n'}
                  {'    '}
                  <span className="hljs-tag">
                    &lt;/<span className="hljs-name">Button</span>&gt;
                  </span>
                </span>
                {'\n'}
                {'  '}){'\n'}
                {'}'}
              </pre>
            </div>
          </div>
        </li>
        <li id="section-7">
          <div className="annotation">
            <div className="sswrap ">
              <a className="ss" href="#section-7">
                §
              </a>
            </div>
            <h2 id="redirect-from-checkr-sign-up-flow">
              Redirect from Checkr Sign-up flow
            </h2>
          </div>
        </li>
        <li id="section-8">
          <div className="annotation">
            <div className="sswrap ">
              <a className="ss" href="#section-8">
                §
              </a>
            </div>
            <p>
              After finishing Sign-up flow, Checkr will redirect you to the URL
              specified in the OAuth redirect URL setting in your Partner
              Application. Once redirected a <code>code</code> parameter is
              attached to the URL along with the state parameter we defined
              earlier. We will use both of these parameters to make a request to
              our applications backend to obtain an OAuth access token for our
              account.
            </p>
          </div>
          <div className="content">
            <div className="highlight">
              <pre>
                <span className="hljs-keyword">import</span> express{' '}
                <span className="hljs-keyword">from</span>{' '}
                <span className="hljs-string">'express'</span>
                {'\n'}
                <span className="hljs-keyword">import</span> database{' '}
                <span className="hljs-keyword">from</span>{' '}
                <span className="hljs-string">'../db.js'</span>
                {'\n'}
                <span className="hljs-keyword">import</span> fetch{' '}
                <span className="hljs-keyword">from</span>{' '}
                <span className="hljs-string">'node-fetch'</span>
                {'\n'}
                <span className="hljs-keyword">import</span> {'{'}
                {'\n'}
                {'  '}encrypt,{'\n'}
                {'  '}decrypt,{'\n'}
                {'  '}parseJSON,{'\n'}
                {'  '}validCheckrSignature,{'\n'}
                {'}'} <span className="hljs-keyword">from</span>{' '}
                <span className="hljs-string">'../helpers/index.js'</span>
                {'\n'}
                {'\n'}
                <span className="hljs-keyword">const</span> checkrRouter =
                express.
                <span className="hljs-title class_">Router</span>(){'\n'}
                <span className="hljs-keyword">const</span> checkrOAuthURL =
                process.<span className="hljs-property">env</span>.
                <span className="hljs-property">CHECKR_OAUTH_URL</span>
                {'\n'}
                <span className="hljs-keyword">const</span> checkrClientId =
                process.<span className="hljs-property">env</span>.
                <span className="hljs-property">CHECKR_OAUTH_CLIENT_ID</span>
                {'\n'}
                <span className="hljs-keyword">const</span> checkrClientSecret =
                process.<span className="hljs-property">env</span>.
                <span className="hljs-property">
                  CHECKR_OAUTH_CLIENT_SECRET
                </span>
              </pre>
            </div>
          </div>
        </li>
        <li id="section-9">
          <div className="annotation">
            <div className="sswrap ">
              <a className="ss" href="#section-9">
                §
              </a>
            </div>
            <h2 id="make-a-request-to-your-backend-to-retrieve-an-oauth-token-from-checkr">
              Make a request to your backend to retrieve an OAuth token from
              Checkr
            </h2>
          </div>
        </li>
        <li id="section-10">
          <div className="annotation">
            <div className="sswrap ">
              <a className="ss" href="#section-10">
                §
              </a>
            </div>
          </div>
        </li>
        <li id="section-11">
          <div className="annotation">
            <div className="sswrap ">
              <a className="ss" href="#section-11">
                §
              </a>
            </div>
            <p>
              Setup a private endpoint to handle Checkr Oauth, we will require
            </p>
            <ul>
              <li>
                a <code>code</code> obtained from the Checkr Sign-up flow
              </li>
              <li>
                an <code>account</code> for our backend to create an OAuth
                access token for
              </li>
            </ul>
          </div>
          <div className="content">
            <div className="highlight">
              <pre>
                checkrRouter.<span className="hljs-title function_">post</span>(
                <span className="hljs-string">'/api/checkr/oauth'</span>,{' '}
                <span className="hljs-keyword">async</span> (req, res) =&gt;{' '}
                {'{'}
                {'\n'}
                {'  '}
                <span className="hljs-keyword">if</span> (!req.
                <span className="hljs-property">body</span>.
                <span className="hljs-property">code</span> || !req.
                <span className="hljs-property">body</span>.
                <span className="hljs-property">accountId</span>) {'{'}
                {'\n'}
                {'    '}res.<span className="hljs-title function_">status</span>
                (<span className="hljs-number">400</span>).
                <span className="hljs-title function_">send</span>({'{'}
                {'\n'}
                {'      '}
                <span className="hljs-attr">errors</span>: [
                <span className="hljs-string">
                  'request body must contain a code and an accountId'
                </span>
                ],{'\n'}
                {'    '}
                {'}'}){'\n'}
                {'    '}
                <span className="hljs-keyword">return</span>
                {'\n'}
                {'  '}
                {'}'}
                {'\n'}
                {'\n'}
                {'  '}
                <span className="hljs-keyword">const</span> options = {'{'}
                {'\n'}
                {'    '}
                <span className="hljs-attr">method</span>:{' '}
                <span className="hljs-string">'POST'</span>,{'\n'}
                {'    '}
                <span className="hljs-attr">body</span>:{' '}
                <span className="hljs-title class_">JSON</span>.
                <span className="hljs-title function_">stringify</span>({'{'}
                {'\n'}
                {'      '}
                <span className="hljs-attr">code</span>: req.
                <span className="hljs-property">body</span>.
                <span className="hljs-property">code</span>,{'\n'}
                {'      '}
                <span className="hljs-attr">client_id</span>: checkrClientId,
                {'\n'}
                {'      '}
                <span className="hljs-attr">client_secret</span>:
                checkrClientSecret,{'\n'}
                {'    '}
                {'}'}),{'\n'}
                {'    '}
                <span className="hljs-attr">headers</span>: {'{'}
                <span className="hljs-string">'Content-Type'</span>:{' '}
                <span className="hljs-string">'application/json'</span>
                {'}'},{'\n'}
                {'  '}
                {'}'}
              </pre>
            </div>
          </div>
        </li>
        <li id="section-12">
          <div className="annotation">
            <div className="sswrap ">
              <a className="ss" href="#section-12">
                §
              </a>
            </div>
            <h2 id="send-a-request-from-your-backend-to-checkr-for-an-oauth-access-token">
              Send a request from your backend to Checkr for an OAuth access
              token
            </h2>
          </div>
        </li>
        <li id="section-13">
          <div className="annotation">
            <div className="sswrap ">
              <a className="ss" href="#section-13">
                §
              </a>
            </div>
          </div>
        </li>
        <li id="section-14">
          <div className="annotation">
            <div className="sswrap ">
              <a className="ss" href="#section-14">
                §
              </a>
            </div>
            <p>
              Send a <code>HTTP POST</code> to{' '}
              <code>
                {'{'}checkr-api-url{'}'}/oauth/tokens
              </code>
              . In the JSON payload send
            </p>
          </div>
        </li>
        <li id="section-15">
          <div className="annotation">
            <div className="sswrap ">
              <a className="ss" href="#section-15">
                §
              </a>
            </div>
            <pre>
              <code>
                {'{'}
                {'\n'}
                {'  '}
                <span className="hljs-attr">code</span>: &lt;code-
                <span className="hljs-keyword">from</span>
                -sign-up-flow-redirect&gt;,{'\n'}
                {'  '}
                <span className="hljs-attr">client_id</span>:
                &lt;your-partner-application-client-id&gt;,{'\n'}
                {'  '}
                <span className="hljs-attr">client_secret</span>:
                &lt;your-partner-application-client-secret&gt;,{'\n'}
                {'}'}
                {'\n'}
              </code>
            </pre>
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
                    ${'{'}checkrOAuthURL{'}'}
                  </span>
                  /tokens`
                </span>
                , options){'\n'}
                {'  '}
                <span className="hljs-keyword">const</span> jsonBody ={' '}
                <span className="hljs-keyword">await</span>{' '}
                <span className="hljs-title function_">parseJSON</span>
                (response)
                {'\n'}
                {'\n'}
                {'  '}
                <span className="hljs-keyword">if</span> (!response.
                <span className="hljs-property">ok</span>) {'{'}
                {'\n'}
                {'    '}res.<span className="hljs-title function_">status</span>
                (<span className="hljs-number">422</span>).
                <span className="hljs-title function_">send</span>({'{'}
                {'\n'}
                {'      '}
                <span className="hljs-attr">errors</span>: {'{'}
                {'\n'}
                {'        '}
                <span className="hljs-attr">checkrApiErrors</span>: jsonBody,
                {'\n'}
                {'      '}
                {'}'},{'\n'}
                {'    '}
                {'}'}){'\n'}
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
                <span className="hljs-property">accounts</span>.
                <span className="hljs-title function_">find</span>(
                <span className="hljs-function">
                  <span className="hljs-params">a</span> =&gt;
                </span>{' '}
                a.<span className="hljs-property">id</span> === req.
                <span className="hljs-property">body</span>.
                <span className="hljs-property">accountId</span>){'\n'}
                {'\n'}
                {'  '}
                <span className="hljs-keyword">if</span> (!account) {'{'}
                {'\n'}
                {'    '}res.<span className="hljs-title function_">status</span>
                (<span className="hljs-number">404</span>).
                <span className="hljs-title function_">send</span>({'{'}
                {'\n'}
                {'      '}
                <span className="hljs-attr">errors</span>: [
                <span className="hljs-string">
                  `account with accountId:{' '}
                  <span className="hljs-subst">
                    ${'{'}req.body{'}'}
                  </span>{' '}
                  not found`
                </span>
                ],{'\n'}
                {'    '}
                {'}'}){'\n'}
                {'    '}
                <span className="hljs-keyword">return</span>
                {'\n'}
                {'  '}
                {'}'}
              </pre>
            </div>
          </div>
        </li>
        <li id="section-16">
          <div className="annotation">
            <div className="sswrap ">
              <a className="ss" href="#section-16">
                §
              </a>
            </div>
            <h2 id="checkr-responds-with-an-oauth-access-token-and-your-checkr-account-id">
              Checkr responds with an OAuth access token and your Checkr account
              id
            </h2>
          </div>
        </li>
        <li id="section-17">
          <div className="annotation">
            <div className="sswrap ">
              <a className="ss" href="#section-17">
                §
              </a>
            </div>
          </div>
        </li>
        <li id="section-18">
          <div className="annotation">
            <div className="sswrap ">
              <a className="ss" href="#section-18">
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
                <span className="hljs-attr">access_token</span>:
                &lt;some-access-token&gt;,{'\n'}
                {'  '}
                <span className="hljs-attr">checkr_account_id</span>:
                &lt;some-id&gt;,{'\n'}
                {'}'}
                {'\n'}
              </code>
            </pre>
            <p>
              Save this information in your database, make sure to not store
              this token in plain text.
            </p>
          </div>
          <div className="content">
            <div className="highlight">
              <pre>
                {'  '}account.
                <span className="hljs-property">checkrAccount</span> = {'{'}
                {'\n'}
                {'    '}
                <span className="hljs-attr">accessToken</span>:{' '}
                <span className="hljs-title function_">encrypt</span>(jsonBody.
                <span className="hljs-property">access_token</span>),{'\n'}
                {'    '}
                <span className="hljs-attr">id</span>: jsonBody.
                <span className="hljs-property">checkr_account_id</span>,{'\n'}
                {'  '}
                {'}'}
                {'\n'}
                {'  '}
                <span className="hljs-keyword">await</span> db.
                <span className="hljs-title function_">write</span>(){'\n'}
                {'  '}res.<span className="hljs-title function_">status</span>(
                <span className="hljs-number">200</span>).
                <span className="hljs-title function_">send</span>(jsonBody)
                {'\n'}
                {'}'})
              </pre>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}
