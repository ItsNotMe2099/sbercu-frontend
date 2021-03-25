import nextCookie from "next-cookies";
import {getDisplayName} from "next/dist/next-server/lib/utils";
import {Component} from "react";
import cookie from "js-cookie";
import {parseCookies, setCookie, destroyCookie} from 'nookies'
import Router from "next/router";
import request from "utils/request";

export const auth = ctx => {
  const {token} = nextCookie(ctx);
  return token;
};

const getUser = async (token) => {
  try {
    const res = await request({url: '/api/auth/current', token, method: 'GET'})
    if (res.err) {
      return;
    }
    return res.data;
  } catch (e) {
    console.error("ErrorCurrentUser", e);
  }
}
export const logout = () => {
  cookie.remove("token");
  // To trigger the event listener we save some random data into the `logout` key
  //window.localStorage.setItem("logout", Date.now()); // new
  Router.push("/auth/login");
};

export const withAuthSync = (WrappedComponent) =>
  class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;

    static async getInitialProps(ctx) {
      const token = auth(ctx);
      const user = token ? await getUser(token) : null
      if (ctx.req && (!token || !user)) {
        console.log("Req", ctx.req.url);
        ctx.res.writeHead(302, {Location: `/auth/login?redirect=${ctx.req.url}`});
        ctx.res.end();
        setCookie(ctx, 'authRedirect', ctx.req.url, {
          maxAge: 60 * 3,
          path: '/',
        })
        return;
      } else if (!ctx.req && (!token || !user)) {
        Router.push(`/auth/login?redirect=${ctx.asPath}`);
        cookie.set('authRedirect', ctx.asPath, {
          expires: new Date(new Date().getTime() + 3 * 60 * 1000)
        });
      }else{
        const {authRedirect} = nextCookie(ctx);
        if(authRedirect) {
          destroyCookie(ctx, 'authRedirect');
          console.log("authRedirect", authRedirect);
          ctx.res.writeHead(302, {Location: authRedirect});
          ctx.res.end();
          return ;
        }
      }
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return {...componentProps, token, user};
    }

    // New: We bind our methods
    constructor(props) {
      super(props);

      this.syncLogout = this.syncLogout.bind(this);
    }

    // New: Add event listener when a restricted Page Component mounts
    componentDidMount() {
      window.addEventListener("storage", this.syncLogout);
    }

    // New: Remove event listener when the Component unmount and
    // delete all data
    componentWillUnmount() {
      window.removeEventListener("storage", this.syncLogout);
      window.localStorage.removeItem("logout");
    }

    // New: Method to redirect the user when the event is called
    syncLogout(event) {
      if (event.key === "logout") {
        console.log("logged out from storage!");
        Router.push("/login");
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
