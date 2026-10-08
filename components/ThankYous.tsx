function ThankYous() {
  return (
    <main className="border border-gray-500 rounded-3xl p-8 w-[80%] bg-zinc-900 drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]">
      <h1 className="text-3xl font-bold">acknowledgements</h1>
      <br />
      i would like to thank my family, friends, and community for helping me become who am today. some people i would like to specfically shout out:
      <ul>
        <li>
          - <strong><a href="https://github.com/xon6" target="_blank" className="text-decoration-none pt-[15px]">dya</a></strong> for teaching me for the past {new Date().getFullYear() - 2024} years about linux development and more useful stuff that i will be using for the rest of my life. always generous to provide me with tools when i need them <br />
          - <strong>malek tomoum </strong>for basically being the brother ive always wanted to have <br />
          - <strong>yazeed hassan</strong> for always giving me the egyptian vibes around, great friend to have around <br />
          - <strong>milik abulila</strong> for being a younger brother to me, always appreciative of what i teach him. always ready to try something new with me <br />
        </li>
      </ul>
    </main>
  )
}

export default ThankYous