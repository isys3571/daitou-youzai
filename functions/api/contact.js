export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const formData = await request.formData();
    const data = {
      category: (formData.get('category') || '').trim(),
      company: (formData.get('company') || '').trim(),
      name: (formData.get('name') || '').trim(),
      email: (formData.get('email') || '').trim(),
      tel: (formData.get('tel') || '').trim(),
      message: (formData.get('message') || '').trim(),
      recaptcha_token: formData.get('recaptcha_token') || '',
    };

    if (!data.category || !data.name || !data.email || !data.message) {
      return json({ error: '必須項目が入力されていません' }, 400);
    }

    if (/https?:\/\/|:\/\//i.test(data.message)) {
      return json({ error: '内容欄にURLを含めることはできません' }, 400);
    }

    if (!data.recaptcha_token) {
      return json({ error: 'reCAPTCHAトークンが必要です' }, 400);
    }

    const recaptchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${encodeURIComponent(env.RECAPTCHA_SECRET_KEY)}&response=${encodeURIComponent(data.recaptcha_token)}`,
    });
    const recaptchaResult = await recaptchaRes.json();
    if (!recaptchaResult.success || (recaptchaResult.score ?? 0) < 0.5) {
      return json({ error: 'スパム判定により送信できませんでした' }, 400);
    }

    const subject = `【daitouyouzai.com】お問い合わせ：${data.category}`;
    const text = [
      '新しいお問い合わせを受信しました。',
      '',
      '【お問い合わせ種別】',
      data.category,
      '',
      '【会社名】',
      data.company || '（未入力）',
      '',
      '【ご担当者名】',
      data.name,
      '',
      '【メールアドレス】',
      data.email,
      '',
      '【電話番号】',
      data.tel || '（未入力）',
      '',
      '【お問い合わせ内容】',
      data.message,
      '',
      '---',
      `reCAPTCHAスコア: ${recaptchaResult.score}`,
      `送信日時: ${new Date().toISOString()}`,
    ].join('\n');

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.MAIL_FROM,
        to: env.MAIL_TO,
        reply_to: data.email,
        subject,
        text,
      }),
    });

    if (!resendRes.ok) {
      return json({ error: 'メール送信に失敗しました' }, 502);
    }

    return json({ success: true });
  } catch (err) {
    return json({ error: 'サーバーエラーが発生しました' }, 500);
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
