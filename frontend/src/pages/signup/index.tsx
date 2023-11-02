import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import logoImg from "../../../public/Logo.svg";

import styles from "../../../styles/home.module.scss";

export default function SignUp() {
  return (
    <>
      <Head>
        <title>SujeitoPizza - Cadastre-se</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo sujeito Pizzaria" />

        <div className={styles.login}>
          <form>
            <Input placeholder="Nome da empresa" type="email" />
            <Input placeholder="Digite seu email" type="email" />
            <Input placeholder="Digite sua senha" type="password" />
            <Button type="submit" loading={false}>
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
