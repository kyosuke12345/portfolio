import {
  Box,
  Typography,
  Link,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

// import { RevealGlobalStyles } from "react-genie";
import { ReactGenieAnimations } from "react-genie-styled-components";
import { Reveal } from "react-genie";
import { Animation } from "react-genie-styled-components";
import useMobile from "hooks/useMobile";

const ANIMATION_SPEED = 750;

const getAge = (birthYear: number, birthMonth: number): number => {
  const today = new Date();
  // 今年の誕生日
  const thisYearsBirth = new Date(today.getFullYear(), birthMonth - 1, 1);
  // 年齢
  let age = today.getFullYear() - birthYear;
  if (today < thisYearsBirth) {
    age--;
  }
  return age;
};

const getPeriod = (
  startYear: number,
  startMonth: number,
  endYear: number,
  endMonth: number
): string => {
  const start = new Date(startYear, startMonth - 1, 1);
  const end = new Date(endYear, endMonth - 1, 1);
  const sMonth = start.getFullYear() * 12 + start.getMonth();
  const eMonth = end.getFullYear() * 12 + end.getMonth();
  const diffMonth = eMonth - sMonth;
  return `${startYear}年/${("00" + startMonth).slice(-2)}月〜${endYear}年/${(
    "00" + endMonth
  ).slice(-2)}月(${diffMonth}ヶ月)`;
};

const CAREERS = [
  {
    project: "スマートフォンアプリ開発(クライアント)",
    period: getPeriod(2013, 4, 2013, 12),
    skills: "C++(社内FW)、Objective-c",
  },
  {
    project: "スマートフォンアプリ開発(サーバー)",
    period: getPeriod(2014, 1, 2014, 7),
    skills: "PHP、MYSQL",
  },
  {
    project: "スマートフォンアプリ開発(クライアント&サーバー)",
    period: getPeriod(2014, 8, 2015, 4),
    skills: "C++(社内FW)、Objective-c、PHP、MYSQL",
  },
  {
    project: "ハードソフトゲーム開発",
    period: getPeriod(2015, 5, 2015, 11),
    skills: "C++、ActionScript",
  },
  {
    project: "ハードソフトゲーム開発",
    period: getPeriod(2015, 11, 2015, 12),
    skills: "Unity(C#)",
  },
  {
    project: "スマートフォンアプリ開発(クライアント)",
    period: getPeriod(2016, 1, 2016, 4),
    skills: "Unity(C#)",
  },
  {
    project: "---",
    period: "---",
    skills: "---",
  },
  {
    project: "生産管理システム",
    period: getPeriod(2016, 5, 2016, 9),
    skills: "C#(WPF)、DB2",
  },
  {
    project: "基幹システム開発",
    period: getPeriod(2016, 10, 2017, 12),
    skills: "Java(Apach Wicket)、DB2",
  },
  {
    project: "基幹システム開発",
    period: getPeriod(2018, 1, 2018, 3),
    skills: "Java(常駐先FW)、DB2",
  },
  {
    project: "生産管理システム開発",
    period: getPeriod(2018, 4, 2018, 12),
    skills: "Java(楽々FW2)、Postgresql",
  },
  {
    project: "基幹システム開発",
    period: getPeriod(2019, 1, 2019, 4),
    skills: "Java(楽々FW2)、Postgresql",
  },
  {
    project: "Webシステム開発・保守(BtoB向け)",
    period: getPeriod(2019, 5, 2020, 4),
    skills:
      "Java(Play Framework)、React、Bootstrap4、Redux、Postgresql、Python、Nginx、Zabbix",
  },
  {
    project: "Webシステム開発・保守(BtoB向け)",
    period: getPeriod(2020, 5, 2021, 12),
    skills:
      "TypeScript(NestJS)、React、redux-toolkit、Postgresql、MaterialUI、Heroku",
  },
  {
    project: "---",
    period: "---",
    skills: "---",
  },
  {
    project: "工事現場のIoT開発のWEB画面担当",
    period: getPeriod(
      2022,
      1,
      new Date().getFullYear(),
      new Date().getMonth() + 1
    ),
    skills: "Javascript(Express)、MongoDB、MQTT、Docker、docker-compose",
  },
];

const PortFolioScreen: React.VFC = () => {
  const isMobile = useMobile();
  return (
    <>
      <ReactGenieAnimations />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: isMobile ? undefined : "calc(100vh - 96px)",
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Reveal animation={Animation.FadeInUp}>
            <Box>
              <Typography textAlign="center" variant="h3" gutterBottom>
                {"このサイトについて"}
              </Typography>
            </Box>
          </Reveal>
          <Reveal animation={Animation.FadeInUp} delay={ANIMATION_SPEED * 1}>
            <Box>
              <Typography textAlign={"center"} variant="subtitle1" gutterBottom>
                簡易ポートフォリオを作成しました。
              </Typography>
            </Box>
          </Reveal>
          <Reveal animation={Animation.FadeInUp} delay={ANIMATION_SPEED * 2}>
            <Box>
              <Typography textAlign={"center"} variant="subtitle1" gutterBottom>
                基本的な機能(認証・認可、一覧、詳細)しか実装しておりません。
              </Typography>
            </Box>
          </Reveal>
          <Reveal animation={Animation.FadeInUp} delay={ANIMATION_SPEED * 3}>
            <Box>
              <Typography textAlign={"center"} variant="subtitle1" gutterBottom>
                ソースは下記になります。
              </Typography>
            </Box>
          </Reveal>
          <Reveal animation={Animation.FadeInUp} delay={ANIMATION_SPEED * 4}>
            <Box>
              <Typography textAlign={"center"} variant="subtitle1" gutterBottom>
                <Link href="https://github.com/kyosuke12345/portfolio">
                  https://github.com/kyosuke12345/portfolio
                </Link>
              </Typography>
            </Box>
          </Reveal>

          <Reveal animation={Animation.FadeInUp} delay={ANIMATION_SPEED * 6}>
            <Box sx={{ mt: 4 }}></Box>
            <Typography textAlign="center" variant="h3">
              {"サイトの内容"}
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{"ページ"}</TableCell>
                    <TableCell>{"内容"}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{"ユーザ一覧"}</TableCell>
                    <TableCell>
                      {" "}
                      <div>{"ログイン画面で認証できるユーザ一覧を表示"}</div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{"ログイン"}</TableCell>
                    <TableCell>
                      <div>
                        {"上記一覧画面の、emailとplainPasswordにてログイン可能"}
                      </div>
                      <div>
                        {
                          "ログインした状態でユーザ情報画面に遷移すると、ユーザ情報が確認できます。"
                        }
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{"ユーザ情報"}</TableCell>
                    <TableCell>
                      <div>{"ログインしたユーザ情報を表示"}</div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Reveal>
        </Box>

        <Box sx={{ mt: 3 }}></Box>
        <Reveal animation={Animation.FadeInUp} delay={ANIMATION_SPEED}>
          <Typography textAlign="center" variant="h3">
            {"このサイトの使用言語等"}
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{""}</TableCell>
                  <TableCell>{""}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{"サーバー"}</TableCell>
                  <TableCell>{"Heroku"}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>{"backend"}</TableCell>
                  <TableCell>
                    {"NestJS、TypeOrm、Postgres、Redis、"}
                    <Link href="/swagger" target="_blank">
                      {"Swawgger"}
                    </Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{"front"}</TableCell>
                  <TableCell>
                    {"React(Typescript)、MUI(Material UI、Redux Toolkit)"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{"開発環境"}</TableCell>
                  <TableCell>{"vscode、Docker、docker-compose"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Reveal>

        <Box sx={{ mt: 10 }}></Box>
        <Reveal animation={Animation.FadeInUp} delay={ANIMATION_SPEED}>
          <Typography textAlign="center" variant="h3">
            {"About Me"}
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{""}</TableCell>
                  <TableCell>{""}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{"年齢"}</TableCell>
                  <TableCell>{getAge(1988, 6)}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>{"GitHub"}</TableCell>
                  <TableCell>
                    <Link
                      href="https://github.com/kyosuke12345"
                      target="_blank"
                    >
                      {"https://github.com/kyosuke12345"}
                    </Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{"Qiita"}</TableCell>
                  <TableCell>
                    <Link
                      href="https://qiita.com/akasatana12345"
                      target="_blank"
                    >
                      {"https://qiita.com/akasatana12345"}
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Reveal>
        <Box sx={{ mt: 10 }}></Box>
        <Reveal animation={Animation.FadeInUp} delay={ANIMATION_SPEED}>
          <Typography textAlign="center" variant="h3">
            {"経歴"}
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{"Project"}</TableCell>
                  <TableCell>{"期間"}</TableCell>
                  <TableCell>{"Skills & Tools"}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {CAREERS.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.project}</TableCell>
                    <TableCell>{row.period}</TableCell>
                    <TableCell>{row.skills}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Reveal>
      </Box>
    </>
  );
};

export default PortFolioScreen;
