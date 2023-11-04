import { FormEvent, useState, useContext } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { AuthContext } from "@/src/context/AuthContext";

import logoImg from "../../../public/Logo.svg";

import styles from "../../../styles/home.module.scss";

export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp(e: FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      let data = {
        name,
        email,
        password,
      };
      signUp(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Head>
        <title>SujeitoPizza - Cadastre-se</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo sujeito Pizzaria" />

        <div className={styles.login}>
          <form onSubmit={handleSignUp}>
            <Input
              placeholder="Nome da empresa"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              placeholder="Digite seu email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" loading={loading}>
              Cadastrar
            </Button>
          </form>
          <Link href="/" legacyBehavior>
            <a className={styles.text}>Já possuo uma conta</a>
          </Link>
        </div>
      </div>
    </>
  );
}
