import { Router } from "express";
import passport from "passport";

const router = Router();

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/failLogin" }),
  async (req, res) => {
    if (!req.user) {
      return res.status(404).json({ message: "User not Found" });
    }
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
      role: req.user.role,
    };
    res.status(200).redirect("/");
  }
);
router.get("/failLogin", (req, res) => {
  res.status(401).json({ message: "Fail Login" });
});

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/session/failRegister",
  }),
  async (req, res) => {
    return res.status(201).redirect("/login");
  }
);

router.get("/failRegister", (req, res) => {
  res.status(400).json({ message: "Fail Register" });
});

router.get(
  "/github",
  passport.authenticate("github")
);

router.get('/githubcallback',passport.authenticate('github',{failureRedirect:'/login'}),(req,res)=>{
  req.session.user=req.user
  res.redirect('/')
})

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

export default router;
