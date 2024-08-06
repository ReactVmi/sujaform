import { NextResponse } from "next/server";
import decodeToken from "jwt-decode";
import Cookies from "js-cookie";
export function middleware(request) {
  const { pathname } = request.nextUrl;
  console.log(pathname);
  let cookie = request.cookies.get("token");
  let userData = false;
  if (cookie) {
    userData = decodeToken(cookie.value);
  }
  if (request.nextUrl.pathname.startsWith("/api/auth/login")) {
    return NextResponse.next()
  }
  if (request.nextUrl.pathname.startsWith("/api/payment")) {
    return NextResponse.next()
  }
  if (request.nextUrl.pathname.startsWith("/api/user/find")) {
    return NextResponse.next()
  }
  if (request.nextUrl.pathname.startsWith("/api/leads")) {
    return NextResponse.next()
  }
  if (request.nextUrl.pathname.startsWith("/api/leads/post")) {
    return NextResponse.next()
  }
  if (request.nextUrl.pathname.startsWith("/api/api_mailer")) {
    return NextResponse.next()
  }
  if (request.nextUrl.pathname.startsWith("/api/user/post")) {
    return NextResponse.next()
  }
 
  if (request.nextUrl.pathname.startsWith("/api") && !cookie) {
    return NextResponse.json({ error: 'Unauthorizes' }, { status: 401 })
  }
  if (request.nextUrl.pathname.startsWith("/admin") && !cookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (request.nextUrl.pathname.startsWith("/admin") && cookie) {
    if (userData && !(userData.role == "admin")) {
      return NextResponse.redirect(new URL("/" + userData.role, request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/customer") && !cookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (request.nextUrl.pathname.startsWith("/customer") && cookie) {
    if (userData && !(userData.role == "customer")) {
      return NextResponse.redirect(new URL("/" + userData.role, request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/login") && cookie) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  if (request.nextUrl.pathname == "/") {
    return NextResponse.redirect(new URL("/bookings", request.url));
  }

  if (request.nextUrl.pathname == "/bookings/course") {
    console.log("donesdasda");
  }

  if (request.nextUrl.pathname == "/bookings") {
    const userCookie = request.cookies.get("formData");
    //console.log(userCookie)
    const formData = userCookie ? JSON.parse(userCookie.value) : null;

    if (formData) {
      // You now have your object
      //console.log(formData.firstName); // Outputs: John Doe
      //console.log(formData.step); // Outputs: john@example.com
      //return NextResponse.redirect(new URL(formData.step,request.url))
    } else {
      // Handle the case where the cookie doesn't exist or is invalid
    }
    // let formdata = cookies.get("formData");
    // let data = formdata.value
    // let redirect= data.step;
    // console.log(formdata.value.firstName);
    // return NextResponse.redirect(new URL(redirect,request.url))
  }
}
