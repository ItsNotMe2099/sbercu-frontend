import nextCookie from "next-cookies";
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
  Router.push("/auth/login");
};


export const getAuthServerSide = ({ redirect }: { redirect?: boolean } = {})  => (async (ctx) => {
    const token = auth(ctx)
    console.log("Token111", token);
    const user = token ? await getUser(token) : null

    if (!user && redirect) {
      setCookie(ctx, 'authRedirect', ctx.req.url, {
        maxAge: 60 * 3,
        path: '/',
      })

      console.log("Try redirect", `/auth/login?redirect=${ctx.req.url}`)
      return {   redirect: {
          destination: `/auth/login?redirect=${ctx.req.url}`,
          permanent: false,
        },}

    }else if(user && ctx.req){
      const {authRedirect} = nextCookie(ctx);
      console.log("authRedirect", authRedirect, ctx.req.url);
      if(authRedirect) {
        setCookie(ctx, 'authRedirect', '', {
          maxAge: 60 * 3,
          path: '/',
        })
      }
      if(authRedirect && authRedirect !== ctx.req.url)
      return {   redirect: {
          destination: authRedirect,
          permanent: false,
        },}

    }
    if (!user) {
      return { props: {} }
    }
    console.log("User11", user);

    return { props: { user } }
  })

