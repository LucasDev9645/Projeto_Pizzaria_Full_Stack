import { useContext, FormEvent } from "react";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { AuthContext } from "../context/AuthContext";

import { Input } from "../components/Input";
import { Button } from "../components/Button";

import logoImg from "../../public/Logo.svg";

import styles from "../../styles/home.module.scss";

export default function Home() {
  const { signIn } = useContext(AuthContext);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    let data = {
      email: "Lucasdev9645@gmail.com",
      password: "123123",
    };

    signIn(data);
  }

  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo sujeito Pizzaria" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input placeholder="Digite seu email" type="email" />
            <Input placeholder="Digite sua senha" type="password" />
            <Button type="submit" loading={false}>
              Acessar
            </Button>
          </form>
          <Link href="/signup" legacyBehavior>
            <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
          </Link>
        </div>
      </div>
    </>
  );
}
