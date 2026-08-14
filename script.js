/* ============================================================
   STIGMÉS — lógica do app (JS puro)
   ============================================================ */
const APP_VERSION = '2026-08-14-s (ícone sem texto no topo)';
console.log('%cStigmés versão ' + APP_VERSION, 'color:#1E5AA8;font-weight:bold');

// Logo animada (SVG inline) para splash, login e topo
const LOGO_SVG = `<svg width="1254" height="1254" viewBox="0 0 1254 1254" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M552.719 926.641C598.698 922.375 615.318 957.734 611.469 995.546C609.463 1015.27 615.252 1033.16 601.724 1051.55C584.415 1075.09 546.935 1076.32 523.587 1061.88C519.878 1059.5 517.668 1056.46 517.081 1052.11C520.297 1043.57 531.217 1053.86 535.886 1056.14C538.545 1057.44 540.905 1058.23 543.709 1059.14C548.376 1060.14 553.14 1060.65 557.917 1060.65C591.824 1060.55 599.515 1038.92 599.253 1010.51C591.026 1020.2 581.885 1026.19 569.212 1028.66C555.746 1031.21 541.805 1028.4 530.422 1020.85C493.172 996.034 503.524 935.523 552.719 926.641ZM600.409 976.09C599.323 953.962 580.21 936.938 557.823 938.157C535.645 939.368 518.613 958.042 519.691 979.967C520.769 1001.89 539.551 1018.84 561.744 1017.93C584.145 1016.99 601.502 998.218 600.409 976.09Z" fill="#163D5E"/>
<path d="M891.244 926.413C921.45 924.751 940.944 940.078 946.591 969.792C947.303 973.54 947.294 976.33 944.962 979.497C939.788 982.328 872.111 981.061 860.072 981.724C866.357 1013.25 886.693 1025.91 917.464 1015.69C923.733 1012.84 934.159 1002.38 939.291 1007.7C939.691 1009.94 939.152 1012.39 937.761 1014.14C923.554 1032.66 887.806 1035.53 869.515 1021.31C833.498 993.303 844.031 934.694 891.244 926.413ZM896.767 937.206C875.277 939.416 865.448 950.791 860.39 970.913C874.131 971.011 887.863 971.027 901.595 970.954C911.522 970.97 925.411 971.437 935.003 970.946C929.233 950.308 919.993 937.501 896.767 937.206Z" fill="#163D5E"/>
<path d="M731.86 946.377C746.775 921.108 787.914 918.787 803.35 944.517C806.069 949.103 807.901 954.143 808.756 959.392C810.449 969.317 810.547 1016.73 808.267 1026.29C806.598 1027.42 805.125 1028.63 803.032 1028.2C795.241 1026.39 797.724 1015.68 797.521 1009.71C797.301 1002.93 797.797 995.589 797.643 988.851C797.301 974.558 799.833 957.435 789.192 945.981C778.616 934.6 757.432 934.819 746.564 945.819C738.064 954.426 737.844 961.366 737.869 972.536L737.836 1008.56C737.82 1015.04 740.189 1031.01 728.75 1027.36C720.935 1019.74 730.712 966.486 722.066 952.29C710.839 934.972 693.799 933.767 676.849 943.652C655.226 956.254 674.667 1021.34 661.771 1027.6C657.904 1027.56 654.672 1027.26 654.444 1022.48C653.63 1009.84 654.721 996.624 654.192 983.965C652.979 954.854 656.838 932.044 690.983 926.876C708.894 925.015 722.368 930.839 731.86 946.377Z" fill="#163D5E"/>
<path d="M277.816 926.578C290.513 925.417 312.882 927.298 318.356 941.111C318.118 944.685 314.315 946.354 312.538 945.471C298.223 938.339 280.292 930.545 266.327 943.025C263.94 945.16 261.806 949.56 262.116 953.036C267.974 979.992 321.696 965.189 322.003 999.269C322.21 1022.25 304.144 1029.71 284.928 1030.29C274.409 1030.22 251.531 1025.32 247.371 1014.69C246.711 1012.96 246.953 1011.01 248.016 1009.5C252.594 1002.91 263.343 1015.13 269.235 1017.24C305.243 1030.41 333.524 992.342 283.927 982.209C261.655 977.653 238.519 962.932 256.504 936.572C260.72 930.389 270.487 927.527 277.816 926.578Z" fill="#163D5E"/>
<path d="M1009.95 926.724C1022.78 924.994 1043.19 928.234 1050.11 940.233C1050.29 943 1050.75 941.874 1049.37 943.89C1048.42 944.388 1045.22 945.963 1044.12 945.351C1030.9 938.021 1009.7 930.887 997.39 943.457C989.729 951.269 992.879 960.852 1002.99 965.659C1016.32 971.994 1032.89 972.336 1044.79 981.617C1061.06 994.808 1054.44 1020.3 1035.42 1027.07C1028.47 1029.56 1024.1 1030 1016.73 1030.29C1007.53 1030.19 972.553 1023.55 980.05 1009.48C988.228 1004.93 1003.68 1024.26 1021.24 1019.48C1026.07 1018.8 1036.84 1016.06 1039.21 1011.19C1054.05 980.67 1006.35 985.127 991.738 972.785C986.021 967.961 982.224 964.239 981.797 957.84C980.485 938.364 992.165 929.377 1009.95 926.724Z" fill="#163D5E"/>
<path d="M369.947 896.366C372.242 896.277 375.741 896.001 377.453 897.607C381.968 901.852 380.017 920.851 379.926 927.985C388.105 928.098 407.564 924.917 411.721 932.594C411.258 939.533 403.416 938.917 397.921 938.9C391.935 938.884 385.921 938.746 379.932 938.681C380.382 955.221 379.41 972.337 379.644 988.958C379.984 1013.09 387.318 1021.65 411.793 1016.24C422.831 1032.09 389.661 1033.68 376.264 1020.06C372.797 1016.59 370.36 1012.25 369.217 1007.51C366.972 998.105 367.784 951.358 367.78 938.738C361.758 938.779 352.977 940.272 351.005 933.016C353.372 926.678 362.396 927.766 367.772 927.855C367.855 920.275 366.137 901.211 369.947 896.366Z" fill="#163D5E"/>
<path d="M456.217 927.429C460.639 927.191 466.571 926.56 466.67 932.826C466.883 953.333 466.503 973.864 466.627 994.387C466.666 1000.82 468.197 1023.93 464.804 1027.84C462.403 1028.19 454.817 1029.42 454.66 1025.38C453.463 994.51 454.267 963.373 454.296 932.465C454.298 930.497 455.212 929.029 456.217 927.429Z" fill="#163D5E"/>
<path d="M919.218 874.291C923.124 875.034 926.191 875.516 927.005 879.708C924.374 885.461 904.162 906.233 898.685 910.204C895.133 910.27 893.168 910.85 891.005 907.81C891.622 903.446 914.786 877.984 919.218 874.291Z" fill="#163D5E"/>
<path d="M457.83 892.991C460.545 891.74 463.687 892.186 465.998 894.156C468.31 896.118 469.413 899.271 468.867 902.363C468.321 905.447 466.214 907.966 463.391 908.9C459.33 910.253 454.988 907.983 453.507 903.751C452.026 899.51 453.926 894.79 457.83 892.991Z" fill="#163D5E"/>
<path d="M369.131 769.916C415.635 767.419 462.237 772.412 507.164 784.682C546.995 795.411 585.691 810.854 624.542 823.72C692.043 846.066 763.545 854.812 833.311 838.185C850.481 834.09 866.217 828.917 883.005 823.312C874.057 828.419 865.24 833.6 855.982 838.144C777.651 877.231 688.392 874.376 607.632 845.169C564.413 829.537 523.428 810.863 479.833 796.055C434.02 780.497 399.197 776.075 352.005 771.417C356.886 770.307 363.953 770.185 369.131 769.916Z" fill="#5DA8BC"/>
<path d="M682.747 631.738C732.471 630.461 786.901 632.213 836.698 633.294C870.192 634.014 919.035 635.037 951.005 641.144C936.684 645.516 899.03 648.078 883.82 648.946C834.61 651.385 785.351 652.744 736.076 653.039C686.776 653.996 632.746 651.991 583.429 650.894C552.736 650.223 495.139 648.258 466.005 641.242C496.134 635.52 537.608 634.309 568.405 633.523C606.51 632.491 644.628 631.894 682.747 631.738Z" fill="#FEB970">
  <animate attributeName="opacity" values="0.25;1;0.25" dur="1.6s" begin="0s" repeatCount="indefinite"/>
</path>
<path d="M688.807 671.585C742.493 670.702 796.195 671.804 849.8 674.89C861.612 675.643 885.604 676.672 895.719 680.228L896.005 681.411C881.721 688.199 780.565 691.318 757.364 691.771C713.802 693.173 667.327 691.52 623.879 689.398C602.204 688.345 568.711 686.498 548.005 680.965C569.795 673.448 661.976 671.974 688.807 671.585Z" fill="#FEB970">
  <animate attributeName="opacity" values="0.25;1;0.25" dur="1.6s" begin="0.25s" repeatCount="indefinite"/>
</path>
<path d="M705.835 713.267C737.812 710.409 783.476 714.244 815.005 719.365C800.61 724.375 771.298 725.82 755.378 726.979C727.053 727.844 672.659 727.36 646.005 719.555C666.986 715.212 684.43 714.466 705.835 713.267Z" fill="#FEB970">
  <animate attributeName="opacity" values="0.25;1;0.25" dur="1.6s" begin="0.5s" repeatCount="indefinite"/>
</path>
<path d="M702.842 318.291C766.35 318.291 825.427 343.303 869.37 384.002C897.908 411.845 919.072 446.815 930.343 485.791C942.189 527.435 942.173 573.944 928.508 615.161L478.301 615.291C474.74 601.616 471.642 590.632 469.784 576.616C465.417 541.895 469.138 506.841 480.408 474.116C513.349 383.232 600.503 318.291 702.842 318.291Z" fill="url(#paint0_linear_239_1165)"/>
<g>
  <path d="M360.768 195.837C402.702 192.219 445.006 206.441 468.253 243.095C479.563 260.929 482.792 277.913 484.441 298.421C486.582 292.542 487.655 287.248 490.227 281.317C517.809 217.682 583.776 189.624 647.929 217.271C624.033 222.891 610.49 229.24 589.978 241.691C595.047 242.551 598.669 243.423 603.65 244.714C585.049 249.449 564.768 257.875 548.812 268.674L566.195 267.643C545.607 284.163 528.902 304.153 507.51 320.424C549.528 303.892 589.184 303.549 627.546 329.217C656.733 353.716 666.094 375.756 671.141 413.055C662.352 404.599 655.422 397.851 645.435 390.662C637.445 384.913 627.278 379.551 620.209 373.171L619.084 372.165C618.864 371.958 618.643 371.75 618.423 371.544C620.502 376.729 622.19 380.841 624.677 385.837C613.361 372.658 600.641 362.832 585.287 354.673L593.55 367.381C585.284 364.11 575.509 361.977 566.8 359.807C566.721 359.866 566.641 359.923 566.561 359.983C552.33 356.619 538.143 353.055 524.005 349.291C538.021 357.136 541.287 360.045 552.167 372.291C552.192 372.265 552.217 372.239 552.242 372.213C577.845 407.604 579.094 453.693 555.268 490.51C553.719 481.879 551.729 469.649 548.832 461.655C541.596 441.683 530.231 420.77 520.704 401.548L519.867 418.422C518.518 415.836 515.886 410.412 514.35 408.241C503.125 388.816 488.128 370.497 478.538 352.843C478.458 352.988 478.378 353.134 478.298 353.279C475.805 350.62 469.392 346.943 462 352.001C461.634 352.251 461.238 352.517 460.818 352.803C436.221 368.137 415.865 377.356 391.969 396.121C393.585 392.26 394.809 388.298 396.121 384.322C386.844 393.445 379.514 404.216 370.925 413.737C370.797 413.87 367.559 414.671 366.358 415.968C354.692 428.576 346.78 441.438 338.649 456.02C326.421 396.788 357.629 344.644 417.711 332.59C391.423 330.912 375.988 330.684 349.667 333.757C353.47 330.656 356.46 328.094 360.056 324.744C350.763 327.3 343.907 329.492 335.303 334.075C331.125 336.3 324.24 340.919 320.252 342.52L320.21 339.807L318.718 339.291C300.041 343.7 279.323 354.608 263.829 365.642C269.915 348.259 276.032 335.649 288.288 321.562C308.643 297.732 337.706 283.087 368.947 280.918C403.279 278.556 432.294 290.226 457.853 312.605C444.02 293.72 426.248 268.899 408.492 254.275L424.382 256.595C409.254 247.832 395.096 240.736 379.852 232.467L393.874 232.993C384.865 229.755 374.392 223.602 365.509 219.275C350.644 212.034 339.394 208.72 323.685 205.095C335.444 199.963 347.978 196.833 360.768 195.837Z" fill="#113354"/>
  <animateTransform attributeName="transform" attributeType="XML" type="rotate" values="-2.5 420 485; 2.5 420 485; -2.5 420 485" dur="3.2s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"/>
</g>
<path d="M461.999 352C469.391 346.943 475.804 350.62 478.297 353.279C416.931 464.287 395.6 590.488 454.128 707.921C455.357 707.919 456.578 707.922 457.79 707.929C456.91 708.022 455.98 708.048 454.999 708C430.996 706.839 407.243 711.516 397.43 714.236C393.013 701.348 389.516 687.268 386.889 673.931C363.358 554.446 397.226 450.719 462.585 351.697C461.994 352.07 461.404 352.438 460.818 352.803C461.238 352.517 461.634 352.25 461.999 352Z" fill="#113354"/>
<path d="M397.431 714.236C407.243 711.517 430.997 706.839 455 708C455.982 708.048 456.913 708.022 457.795 707.929C503.61 708.174 537.72 714.46 581.775 731.111C623.087 746.719 659.971 769.584 703.662 778.049C717.962 780.816 729.108 781.69 743.474 782.735C785.126 782.661 804.457 778.971 844.944 768.335L851.258 766.426C916.372 746.909 977.238 734.283 1041.86 768.8C1042.58 769.183 1043.3 769.576 1044 769.968C995.284 757.128 956.622 757.348 908.316 773.927C873.634 785.837 833.725 804.513 797.241 809.313C771.372 813.851 720.661 817.223 695.33 810.481C690.756 810.268 676.35 807.379 671.271 806.22C642.793 799.755 611.941 790.938 584.069 781.95C472.089 745.846 373.653 744.107 260.005 776.686C301.332 745.389 346.389 723.863 397.504 714.451C397.479 714.38 397.455 714.308 397.431 714.236Z" fill="#113354"/>
<defs>
<linearGradient id="paint0_linear_239_1165" x1="703.505" y1="318.291" x2="703.505" y2="615.291" gradientUnits="userSpaceOnUse">
<stop stop-color="#FD7D4D"/>
<stop offset="1" stop-color="#FCC478"/>
</linearGradient>
</defs>
</svg>`;


/* ---- Login com Google (Google Identity Services) ---- */
// Cole aqui o seu Client ID (ver INSTALACAO.md → seção Login Google).
const GOOGLE_CLIENT_ID = "859071487984-7dnmm6tql49updmqrtnoj988refi81f1.apps.googleusercontent.com";

const AUTH = {
  get user() {
    try { return JSON.parse(localStorage.getItem('stigmes_user') || 'null'); }
    catch { return null; }
  },
  set user(u) {
    if (u) localStorage.setItem('stigmes_user', JSON.stringify(u));
    else localStorage.removeItem('stigmes_user');
  },

  // Decodifica o token JWT que o Google devolve (só a parte de dados, sem validar assinatura)
  decode(jwt) {
    try {
      const base = jwt.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const json = decodeURIComponent(atob(base).split('').map((c) =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
      return JSON.parse(json);
    } catch { return null; }
  },

  // Chamado pelo Google quando o login dá certo
  handleCredential(response) {
    const info = AUTH.decode(response.credential);
    if (!info) return;
    const first = (info.given_name || info.name || 'Você').trim();
    AUTH.user = {
      id: 'g_' + (info.sub || Date.now()),
      name: first,
      fullName: info.name || first,
      email: info.email || '',
      picture: info.picture || '',
      initials: (info.name || first).split(/\s+/).map((s) => s[0]).slice(0, 2).join('').toUpperCase(),
      color: '#1E5AA8',
    };
    AUTH.ensureMember();
    enterApp();
  },

  // Cadastra o usuário logado na aba Usuarios (não mexe em Participantes;
  // isso acontece ao criar ou entrar numa viagem).
  // O Apps Script (upsertUser_) reconhece pelo google_id e nunca duplica,
  // então é seguro enviar sempre que a pessoa loga.
  ensureMember() {
    const u = AUTH.user;
    if (!u || !SYNC.url) return;
    SYNC.save('Usuarios', {
      google_id: u.id,
      nome: u.fullName || u.name,
      email: u.email || '',
      foto_url: u.picture || '',
      iniciais: u.initials,
      cor: u.color,
    });
  },

  signOut() {
    AUTH.user = null;
    if (window.google && google.accounts && google.accounts.id) google.accounts.id.disableAutoSelect();
    location.reload();
  },

  configured() {
    return GOOGLE_CLIENT_ID && !GOOGLE_CLIENT_ID.startsWith('COLE_');
  },
};

/* ---- Sincronização com Google Sheets (via Apps Script) ---- */
const DEFAULT_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzt3ePy6d49gxtDARqgJYdmVaHenRSh9zAkHqwZinlBuFpA9y6vfmZ7iK57BPhSWCepjg/exec';
// Normaliza qualquer formato de data para AAAA-MM-DD (que o input type=date entende).
// O Sheets às vezes devolve a data como ISO completa ou "Mon Aug 18 2026...".
function fmtDateInput(v) {
  if (!v) return '';
  const s = String(v).trim();
  // já está no formato certo
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  // formato brasileiro dd/mm/aaaa
  const br = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (br) return `${br[3]}-${br[2].padStart(2,'0')}-${br[1].padStart(2,'0')}`;
  // qualquer coisa que o Date entenda (ISO, "Mon Aug 18 2026", etc)
  const d = new Date(s);
  if (!isNaN(d)) {
    const y = d.getFullYear(), m = String(d.getMonth()+1).padStart(2,'0'), dd = String(d.getDate()).padStart(2,'0');
    return `${y}-${m}-${dd}`;
  }
  return '';
}

// Converte uma linha da aba Viagens no objeto usado pelo app
function mapTrip(v) {
  return {
    id: String(v.id),
    name: v.nome || 'Viagem',
    destination: v.destino || '',
    start: fmtDateInput(v.inicio), end: fmtDateInput(v.fim),
    budget: Number(v.orcamento) || 0,
    currency: v.moeda || '€',
    criadaPor: v.criadaPor || '',
    orcCat: {
      transporte:  Number(v.orcTransporte)  || 0,
      hospedagem:  Number(v.orcHospedagem)  || 0,
      alimentacao: Number(v.orcAlimentacao) || 0,
      passeios:    Number(v.orcPasseios)    || 0,
      outros:      Number(v.orcOutros)      || 0,
    },
  };
}

const SYNC = {
  get url() { return localStorage.getItem('stigmes_sheet_url') || DEFAULT_SHEET_URL; },
  set url(v) { localStorage.setItem('stigmes_sheet_url', v || ''); },
  status: 'off', // off | ok | erro | ...

  // Recarrega em segundo plano, sem interromper o usuário.
  // Não redesenha se um modal estiver aberto ou se o usuário estiver digitando.
  async refresh() {
    if (!this.url) return;
    if (document.hidden) return;  // aba em segundo plano: não gasta à toa
    const modalAberto = overlay() && !overlay().classList.contains('hidden');
    const digitando = document.activeElement && ['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName);
    if (modalAberto || digitando) return;  // adia: tenta de novo no próximo ciclo
    try {
      const data = await this.jsonp(this.url);
      ALL = data;
      TRIPS = (data.Viagens || []).map(mapTrip);
      if (TRIP) openTrip(TRIP.id, false);
      this.status = 'ok';
      render();
    } catch (err) {
      console.error('Falha no auto-sync:', err);
    }
  },

  // Liga a atualização automática (a cada 60s). Seguro chamar mais de uma vez.
  startAutoSync() {
    if (this._timer) return;
    this._timer = setInterval(() => { SYNC.refresh(); }, 60000);
  },

  async load() {
    if (!this.url) return false;
    this.status = 'carregando';
    try {
      const data = await this.jsonp(this.url);
      ALL = data;
      // Lista de viagens
      TRIPS = (data.Viagens || []).map(mapTrip);
      // Se já havia uma viagem aberta, recarrega os dados dela
      if (TRIP) openTrip(TRIP.id, false);
      this.status = 'ok';
      return true;
    } catch (err) {
      this.status = 'erro';
      console.error('Falha ao ler planilha:', err);
      return false;
    }
  },

  // Leitura via JSONP: contorna o bloqueio de CORS que o fetch sofre
  // ao ler respostas do Apps Script (que redireciona para outro domínio).
  jsonp(url, timeoutMs = 15000) {
    return new Promise((resolve, reject) => {
      const cb = 'stigmes_cb_' + Date.now() + '_' + Math.floor(Math.random() * 1e6);
      const sep = url.includes('?') ? '&' : '?';
      const script = document.createElement('script');
      let done = false;
      const cleanup = () => {
        done = true;
        delete window[cb];
        if (script.parentNode) script.parentNode.removeChild(script);
        clearTimeout(timer);
      };
      const timer = setTimeout(() => { if (!done) { cleanup(); reject(new Error('Tempo esgotado')); } }, timeoutMs);
      window[cb] = (data) => { if (!done) { cleanup(); resolve(data); } };
      script.onerror = () => { if (!done) { cleanup(); reject(new Error('Falha ao carregar')); } };
      script.src = url + sep + 'callback=' + cb;
      document.body.appendChild(script);
    });
  },

  // Salva uma linha. Usa "no-cors" como fallback: o Apps Script recebe,
  // mas o navegador não lê a resposta — por isso atualizamos o app localmente também.
  async save(sheet, row) {
    return this._post({ sheet, row });
  },
  async update(sheet, id, row) {
    return this._post({ sheet, action: 'update', id, row });
  },
  async remove(sheet, id) {
    return this._post({ sheet, action: 'delete', id });
  },
  async _post(payload) {
    if (!this.url) return { ok: false, offline: true };
    try {
      await fetch(this.url, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      return { ok: true };
    } catch (err) {
      console.error('Falha ao gravar na planilha:', err);
      return { ok: false, error: String(err) };
    }
  },
  // Upload de foto: envia via no-cors (sempre funciona, sem bloqueio CORS).
  // O Apps Script salva no Drive e grava o link na linha do post (postId).
  // O app pega o link na próxima sincronização automática.
  async uploadFoto(dataUrl, nome, postId) {
    if (!this.url) return { ok: false, error: 'sem conexão' };
    try {
      await fetch(this.url, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'uploadFoto', dataUrl, nome, postId }),
      });
      return { ok: true };
    } catch (err) {
      console.error('Falha no upload da foto:', err);
      return { ok: false, error: String(err) };
    }
  },
};

// Reconstrói a estrutura de ITINERARY (dias com items) a partir das linhas planas da planilha
// Normaliza horário para "HH:MM".
// O Sheets às vezes converte "17:51" em data ISO (1899-12-30T17:51:...Z);
// esta função extrai só a hora, seja qual for o formato recebido.
function fmtTime(v) {
  if (v === null || v === undefined) return '';
  const s = String(v).trim();
  if (!s) return '';
  // formato ISO com T (ex.: 1899-12-30T17:51:45.000Z)
  const iso = s.match(/T(\d{2}):(\d{2})/);
  if (iso) return iso[1] + ':' + iso[2];
  // "17:51" ou "17:51:45" → pega HH:MM
  const hm = s.match(/^(\d{1,2}):(\d{2})/);
  if (hm) return hm[1].padStart(2, '0') + ':' + hm[2];
  // objeto Date serializado de outra forma: tenta interpretar
  const d = new Date(s);
  if (!isNaN(d.getTime())) {
    return String(d.getUTCHours()).padStart(2, '0') + ':' + String(d.getUTCMinutes()).padStart(2, '0');
  }
  return s;
}

function rebuildItinerary(rows) {
  const byDay = {};
  rows.forEach((r) => {
    const d = Number(r.day) || 1;
    if (!byDay[d]) byDay[d] = { day: d, date: r.date || '', city: r.city || '', items: [] };
    byDay[d].items.push({ id: r.id, time: fmtTime(r.time), name: r.name || '', place: r.place || '', cost: Number(r.cost) || 0, cat: r.cat || 'passeios', criadoPor: r.criadoPor || '' });
  });
  return Object.values(byDay).sort((a, b) => a.day - b.day)
    .map((d) => ({ ...d, items: d.items.sort((a, b) => String(a.time).localeCompare(String(b.time))) }));
}

// Abre uma viagem: filtra membros, despesas, roteiro e memórias daquela viagem.
// goToHome=true navega para o dashboard; false só recarrega os dados.
function openTrip(tripId, goToHome) {
  const t = TRIPS.find((x) => String(x.id) === String(tripId));
  if (!t) return;
  TRIP = t;
  localStorage.setItem('stigmes_last_trip', String(t.id));
  const data = ALL || {};

  // Membros: cruza Usuarios × Participantes desta viagem
  const usersByGoogle = {};
  (data.Usuarios || []).forEach((u) => { if (u.google_id) usersByGoogle[u.google_id] = u; });
  MEMBERS = (data.Participantes || [])
    .filter((p) => String(p.tripId) === String(t.id) && String(p.status) !== 'pendente')
    .map((p) => {
      const u = usersByGoogle[p.userId] || {};
      return {
        id: p.userId,
        partId: p.id,
        name: (u.nome || 'Usuário').split(/\s+/)[0],
        initials: u.iniciais || '??',
        color: u.cor || '#1E5AA8',
        admin: String(p.papel) === 'admin',
        canExpense: p.canExpense === true || p.canExpense === 'TRUE' || p.canExpense === 'sim',
        orcamento: Number(p.orcamento) || 0,
      };
    });

  // Pendentes desta viagem
  PENDING = (data.Participantes || [])
    .filter((p) => String(p.tripId) === String(t.id) && String(p.status) === 'pendente')
    .map((p) => {
      const u = usersByGoogle[p.userId] || {};
      return { id: p.userId, partId: p.id, name: u.nome || 'Usuário', initials: u.iniciais || '??', color: u.cor || '#7B6CA8', kind: 'Pedido para entrar', time: '' };
    });

  // Despesas desta viagem
  EXPENSES = (data.Despesas || [])
    .filter((e) => String(e.tripId) === String(t.id))
    .map((e) => ({ ...e, amount: Number(e.amount) || 0, split: Array.isArray(e.split) ? e.split : [] }));

  // Roteiro desta viagem
  ITINERARY = rebuildItinerary((data.Roteiro || []).filter((r) => String(r.tripId) === String(t.id)));

  // Memórias desta viagem
  POSTS = (data.Memorias || [])
    .filter((p) => String(p.tripId) === String(t.id))
    .map((p) => ({
      ...p,
      likes: Number(p.likes) || 0,
      comments: Number(p.comments) || 0,
      tags: Array.isArray(p.tags) ? p.tags : [],
      likedBy: Array.isArray(p.likedBy) ? p.likedBy : (p.likedBy ? String(p.likedBy).split(',').filter(Boolean) : []),
      comentarios: parseComentarios(p.comentariosTexto),
    }))
    .sort((a, b) => Number(b.id) - Number(a.id)); // mais recente primeiro

  if (goToHome) { current = 'home'; window.scrollTo(0, 0); render(); }
}

// Fecha a viagem atual e volta para a lista
function closeTrip() {
  TRIP = null;
  localStorage.removeItem('stigmes_last_trip');
  current = 'trips';
  window.scrollTo(0, 0);
  render();
}

// Sou participante desta viagem?
function inviteCode(trip) {
  // Código fixo: só as letras do nome/destino + id da viagem no fim (estável e legível)
  const base = ((trip.name || '') + (trip.destination || ''))
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')  // tira acentos
    .toUpperCase().replace(/[^A-Z]/g, '');             // só letras
  const letras = (base || 'VIAGEM').slice(0, 8);
  return letras + '-' + String(trip.id);
}

function myStatus(tripId) {
  const meG = AUTH.user && AUTH.user.id;
  const p = (ALL && ALL.Participantes || []).find((x) => String(x.tripId) === String(tripId) && String(x.userId) === String(meG));
  if (!p) return null;
  return String(p.status) === 'pendente' ? 'pendente' : 'ativo';
}
function amMember(tripId) {
  return myStatus(tripId) === 'ativo';
}

// ---- Ícones SVG (Feather-style) ----
const ICON = {
  home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  wallet: '<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  navigation: '<polygon points="3 11 22 2 13 21 11 13 3 11"/>',
  alert: '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  sun: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
  mappin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  plane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
  ticket: '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/><line x1="13" y1="5" x2="13" y2="19"/>',
  chevronright: '<polyline points="9 18 15 12 9 6"/>',
  chevrondown: '<polyline points="6 9 12 15 18 9"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8z"/>',
  message: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"/>',
  globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  userplus: '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>',
  trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  crown: '<path d="M2 6l4 4 6-8 6 8 4-4-2 13H4z"/>',
  checkcircle: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  circle: '<circle cx="12" cy="12" r="10"/>',
  car: '<path d="M5 17H3v-5l2-5h14l2 5v5h-2"/><circle cx="7.5" cy="17" r="2"/><circle cx="16.5" cy="17" r="2"/>',
  hotel: '<path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><rect x="9" y="9" width="6" height="5"/>',
  utensils: '<path d="M3 2v7a2 2 0 0 0 2 2 2 2 0 0 0 2-2V2"/><line x1="5" y1="11" x2="5" y2="22"/><path d="M17 2v20"/><path d="M17 8c0-2 1-4 2-4v18"/>',
  shopping: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
};

function svg(name, size, color) {
  const c = color || 'currentColor';
  const s = size || 20;
  return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICON[name] || ''}</svg>`;
}
function svgFill(name, size, color) {
  const c = color || 'currentColor';
  const s = size || 20;
  return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="${c}" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICON[name] || ''}</svg>`;
}

// ---- Cores ----
const C = { blue: '#1E5AA8', gold: '#D4AF37', teal: '#2E8B8B', clay: '#B5654A' };

// ---- Dados ----
// ---- Estado (tudo vazio; preenchido pela planilha) ----
let TRIPS = [];        // todas as viagens (aba Viagens)
let TRIP = null;       // viagem aberta no momento
let MEMBERS = [];      // participantes da viagem aberta
let PENDING = [];      // aprovações pendentes (por ora vazio)
let EXPENSES = [];     // despesas da viagem aberta
let ITINERARY = [];    // roteiro da viagem aberta
let POSTS = [];        // memórias da viagem aberta
let ALL = null;        // cópia bruta do que veio da planilha (para filtrar por viagem)

const CATEGORIES = {
  transporte: { label: 'Transporte', icon: 'car', color: '#1E5AA8' },
  hospedagem: { label: 'Hospedagem', icon: 'hotel', color: '#2E8B8B' },
  alimentacao: { label: 'Alimentação', icon: 'utensils', color: '#D4AF37' },
  passeios: { label: 'Passeios', icon: 'ticket', color: '#B5654A' },
  outros: { label: 'Outros', icon: 'shopping', color: '#7B6CA8' },
};

const GRADS = [
  'linear-gradient(135deg,#D4AF37,#B5654A)',
  'linear-gradient(135deg,#1E5AA8,#2E8B8B)',
  'linear-gradient(135deg,#F4863C,#FBC56A)',
  'linear-gradient(135deg,#2E8B8B,#5BAEC4)',
];

// ---- Helpers ----
const $ = (sel) => document.querySelector(sel);
const member = (id) => MEMBERS.find((m) => m.id === id) || PENDING.find((m) => m.id === id) || { id, name: 'Usuário', initials: '??', color: '#1E5AA8' };
const meId = () => (AUTH.user ? AUTH.user.id : null);
// Normaliza texto para busca: minúsculo e sem acentos ("Málaga" -> "malaga")
const semAcento = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

// Descobre o dia da semana a partir de uma data tipo "18 de ago".
// Usa o ano da viagem (início) para montar a data completa.
const MESES_PT = { jan:0, fev:1, mar:2, abr:3, mai:4, jun:5, jul:6, ago:7, set:8, out:9, nov:10, dez:11 };
const DIAS_SEMANA = ['domingo','segunda','terça','quarta','quinta','sexta','sábado'];
function diaDaSemana(dateStr) {
  if (!dateStr) return '';
  const m = String(dateStr).toLowerCase().match(/(\d{1,2})\s*de\s*([a-zç]{3})/);
  if (!m) return '';
  const dia = parseInt(m[1], 10);
  const mes = MESES_PT[m[2].slice(0,3)];
  if (mes == null) return '';
  // ano: usa o da data de início da viagem, senão o ano atual
  let ano = new Date().getFullYear();
  if (TRIP && TRIP.start) { const a = new Date(TRIP.start).getFullYear(); if (a) ano = a; }
  const d = new Date(ano, mes, dia);
  if (isNaN(d)) return '';
  return DIAS_SEMANA[d.getDay()];
}
const meIsAdmin = () => { const m = MEMBERS.find((x) => x.id === meId()); return !!(m && m.admin); };

// Lê um arquivo de imagem e devolve um data URL JPEG comprimido (máx ~1200px, qualidade 0.8).
// Isso reduz uma foto de 3-5 MB para ~200-400 KB antes de enviar ao Drive.
function comprimirImagem(file, maxLado = 1200, qualidade = 0.8) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxLado) { height = Math.round(height * maxLado / width); width = maxLado; }
        else if (height > maxLado) { width = Math.round(width * maxLado / height); height = maxLado; }
        const canvas = document.createElement('canvas');
        canvas.width = width; canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', qualidade));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
// Pode editar/excluir um item se for o criador dele OU se for admin da viagem
const podeEditar = (criadoPor) => meIsAdmin() || (criadoPor && String(criadoPor) === String(meId()));
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));

function daysUntil(date) {
  const diff = Math.ceil((new Date(date) - new Date()) / 86400000);
  return diff > 0 ? diff : 0;
}

// Gera um alerta se o orçamento está acabando.
// Duas situações: (a) já gastou 80%+; (b) o que resta não cobre os dias que faltam.
function alertaBudget(gasto, orcamento) {
  if (!orcamento || orcamento <= 0) return '';
  const restante = orcamento - gasto;
  const pct = gasto / orcamento;
  const cur = TRIP.currency;

  // Dias restantes até o fim da viagem (se houver data de fim futura)
  let diasRestantes = 0;
  if (TRIP.end) diasRestantes = daysUntil(TRIP.end);

  const avisos = [];
  // Situação A: estourou
  if (restante < 0) {
    return `<div class="budget-alert danger">${svg('alert',18)}<div>Orçamento estourado em <b>${cur}${Math.abs(restante).toLocaleString('pt-BR')}</b>. Cuidado com novos gastos.</div></div>`;
  }
  // Situação B: gastou 80%+
  if (pct >= 0.8) {
    avisos.push(`Você já usou <b>${Math.round(pct*100)}%</b> do orçamento — restam só <b>${cur}${restante.toLocaleString('pt-BR')}</b>.`);
  }
  // Situação C: o restante não cobre os dias que faltam (menos de ~um valor/dia saudável)
  if (diasRestantes > 0 && restante > 0) {
    const porDia = restante / diasRestantes;
    const gastoMedioDia = gasto > 0 ? (gasto / Math.max(1, (TRIP.totalDias || diasRestantes))) : 0;
    // se o que sobra por dia é bem menor que o ritmo de gasto, alerta
    if (gastoMedioDia > 0 && porDia < gastoMedioDia * 0.7) {
      avisos.push(`Faltam <b>${diasRestantes} dias</b> e sobram <b>${cur}${restante.toLocaleString('pt-BR')}</b> (${cur}${porDia.toFixed(0)}/dia). Pode não ser suficiente no ritmo atual.`);
    }
  }

  if (avisos.length === 0) return '';
  const nivel = pct >= 0.9 ? 'danger' : 'warn';
  return `<div class="budget-alert ${nivel}">${svg('alert',18)}<div>${avisos.join('<br>')}</div></div>`;
}

function avatar(id, size) {
  const m = member(id); const s = size || 32;
  return `<div class="avatar" style="width:${s}px;height:${s}px;background:${m.color};font-size:${s*0.36}px">${m.initials}</div>`;
}

// Liquidação inteligente
function computeBalances(expenses) {
  const net = {};
  MEMBERS.forEach((m) => (net[m.id] = 0));
  expenses.forEach((e) => {
    const share = e.amount / e.split.length;
    net[e.paidBy] += e.amount;
    e.split.forEach((p) => { if (net[p] !== undefined) net[p] -= share; });
  });
  return net;
}
function settle(net) {
  const debtors = [], creditors = [];
  Object.entries(net).forEach(([id, v]) => {
    if (v < -0.01) debtors.push({ id, v: -v });
    else if (v > 0.01) creditors.push({ id, v });
  });
  debtors.sort((a,b) => b.v - a.v); creditors.sort((a,b) => b.v - a.v);
  const tx = []; let i=0, j=0;
  while (i < debtors.length && j < creditors.length) {
    const amt = Math.min(debtors[i].v, creditors[j].v);
    tx.push({ from: debtors[i].id, to: creditors[j].id, amount: amt });
    debtors[i].v -= amt; creditors[j].v -= amt;
    if (debtors[i].v < 0.01) i++;
    if (creditors[j].v < 0.01) j++;
  }
  return tx;
}

// ============================================================
// RENDER: Lista de viagens
// ============================================================
function renderTrips() {
  const cards = TRIPS.map((t) => {
    const st = myStatus(t.id);
    const dias = t.start ? daysUntil(t.start) : null;
    let acao;
    if (st === 'ativo') acao = `<button class="trip-open" data-open="${esc(t.id)}">Abrir</button>`;
    else if (st === 'pendente') acao = `<button class="trip-open" disabled style="opacity:.6">${svg('clock',14)} Aguardando aprovação</button>`;
    else acao = `<button class="trip-join" data-join="${esc(t.id)}">Participar</button>`;
    const cardClickavel = st === 'ativo';
    return `<div class="trip-card${cardClickavel?' trip-card-clickable':''}"${cardClickavel?` data-open-card="${esc(t.id)}"`:''}>
      <div class="trip-cover"></div>
      <div class="trip-body">
        <div class="trip-name serif">${esc(t.name)}</div>
        <div class="trip-dest">${t.destination ? svg('mappin',13) + ' ' + esc(t.destination) : ''}</div>
        <div class="trip-meta">${dias !== null && dias > 0 ? `faltam ${dias} dias` : (t.start ? 'em andamento' : '')} ${t.budget ? '· ' + t.currency + Number(t.budget).toLocaleString('pt-BR') : ''}</div>
        <div class="trip-actions">${acao}</div>
      </div>
    </div>`;
  }).join('');

  const carregando = SYNC.url && SYNC.status === 'carregando' && TRIPS.length === 0;
  const vazio = (!carregando && SYNC.url && TRIPS.length === 0)
    ? `<div class="empty">Nenhuma viagem ainda.<br>Crie a primeira no botão +.</div>`
    : '';
  const loadingBox = carregando
    ? `<div class="empty"><div class="spinner"></div>Carregando suas viagens...</div>`
    : '';

  const semPlanilha = !SYNC.url
    ? `<div class="card"><div style="font-size:13px;color:var(--sub)">Conecte sua planilha em Configurações (engrenagem no topo) para ver e salvar viagens.</div></div>`
    : '';

  const codeEntry = SYNC.url
    ? `<button class="code-entry-btn" id="open-code">${svg('ticket',15)} Entrar com código</button>`
    : '';

  return `
    <h2 class="section-title serif">Para onde vamos?</h2>
    ${semPlanilha}
    ${codeEntry}
    <div class="trips-list">${cards}</div>
    ${loadingBox}${vazio}`;
}

// ============================================================
// RENDER: Dashboard
// ============================================================
// Decide o texto do hero conforme a viagem esteja por vir, em andamento ou concluída
function statusViagem() {
  const hoje = new Date(); hoje.setHours(0,0,0,0);
  const inicio = TRIP.start ? new Date(TRIP.start) : null;
  const fim = TRIP.end ? new Date(TRIP.end) : null;
  if (inicio) inicio.setHours(0,0,0,0);
  if (fim) fim.setHours(0,0,0,0);

  // Sem data de início definida
  if (!inicio) return { kicker: 'Sua viagem', num: '', lbl: 'defina as datas no Admin' };

  // Ainda vai começar
  if (hoje < inicio) {
    const dias = Math.ceil((inicio - hoje) / 86400000);
    return { kicker: 'Sua próxima viagem', num: dias, lbl: dias === 1 ? 'dia até a partida' : 'dias até a partida' };
  }

  // Já terminou
  if (fim && hoje > fim) {
    return { kicker: 'Relembre os momentos', num: '', lbl: 'Viagem concluída ✓' };
  }

  // Em andamento: dia X de N
  const totalDias = fim ? Math.round((fim - inicio) / 86400000) + 1 : null;
  const diaAtual = Math.round((hoje - inicio) / 86400000) + 1;
  if (totalDias) return { kicker: 'Você está na viagem!', num: diaAtual, lbl: `de ${totalDias} dias de viagem` };
  return { kicker: 'Você está na viagem!', num: diaAtual, lbl: `º dia de viagem` };
}

function renderDashboard() {
  if (!TRIP) return renderTrips();
  const spent = EXPENSES.reduce((s,e) => s+e.amount, 0);
  const orc = TRIP.budget || 0;
  const restante = orc - spent;
  const pct = orc ? Math.round((spent / orc) * 100) : 0;
  const sv = statusViagem();
  return `
    <div class="hero">
      <button class="hero-back" id="hero-back">${svg('chevronright',18,'#fff')}<span>Trocar viagem</span></button>
      <div class="kicker">${sv.kicker}</div>
      <h1 class="serif">${esc(TRIP.name)}</h1>
      <div class="dest">${svg('mappin',14)} ${esc(TRIP.destination)}</div>
      <div class="count">${sv.num !== '' ? `<span class="num serif">${sv.num}</span>` : ''}<span class="lbl">${sv.lbl}</span></div>
      <div class="plane">${svg('plane',120,'#fff')}</div>
    </div>
    ${nextActivityCard()}
    ${alertaBudget(spent, orc)}
    <div class="card" style="margin-top:12px">
      <div style="text-align:center;padding:2px 0">
        <div style="font-size:12px;color:var(--sub)">${restante>=0?'Saldo restante':'Acima do orçamento'}</div>
        <div class="saldo-big serif" style="color:${restante>=0?C.teal:C.clay}">${TRIP.currency}${Math.abs(restante).toLocaleString('pt-BR')}</div>
      </div>
      <div class="track" style="margin-top:6px"><div class="fill" style="width:${Math.min(pct,100)}%"></div></div>
      <div class="row-between" style="margin-top:12px;font-size:13px">
        <span style="color:var(--sub)">Gasto <b style="color:var(--text)">${TRIP.currency}${spent.toLocaleString('pt-BR')}</b></span>
        <span style="color:var(--sub)">Orçamento ${TRIP.currency}${orc.toLocaleString('pt-BR')}</span>
      </div>
    </div>`;
}

function nextActivityCard() {
  // primeira atividade do primeiro dia com itens
  for (const d of ITINERARY) {
    if (d.items && d.items.length) {
      const it = d.items[0];
      const btnMapa = (it.place || '').trim() ? `<button class="tl-map" data-map="${esc(it.place)}" title="Abrir no mapa">${svg('mappin',18,C.blue)}</button>` : '';
      return `<div class="card" style="margin-top:12px">
        <div class="mini-label">Próxima atividade</div>
        <div class="next-row">
          <div class="next-ico">${svg('ticket',20)}</div>
          <div style="flex:1"><div style="font-weight:600">${esc(it.name)}</div><div style="font-size:12px;color:var(--sub)">${esc(d.date)} · ${esc(it.time)} · ${esc(it.place)}</div></div>
          ${btnMapa}
        </div>
      </div>`;
    }
  }
  return `<div class="card" style="margin-top:12px"><div class="mini-label">Próxima atividade</div><div style="font-size:13px;color:var(--sub);margin-top:8px">Nenhuma atividade no roteiro ainda.</div></div>`;
}

// ============================================================
// RENDER: Budget
// ============================================================
let budgetTab = 'meu';
function renderBudget() {
  const total = EXPENSES.reduce((s,e) => s+e.amount, 0);
  const pct = TRIP.budget ? Math.round((total / TRIP.budget) * 100) : 0;
  const remaining = (TRIP.budget || 0) - total;
  const byCat = {}; EXPENSES.forEach((e) => byCat[e.cat] = (byCat[e.cat]||0)+e.amount);
  const net = computeBalances(EXPENSES);
  const tx = settle(net);

  const gastos = EXPENSES.map((e) => {
    const cat = CATEGORIES[e.cat];
    const editavel = podeEditar(e.criadoPor);
    return `<div class="expense${editavel?' expense-clickable':''}"${editavel?` data-edit-expense="${esc(String(e.id))}"`:''}>
      <div class="ico" style="background:${cat.color}18">${svg(cat.icon,18,cat.color)}</div>
      <div class="info"><div class="desc">${esc(e.desc)}</div><div class="meta">${esc(e.date)} · pago por ${member(e.paidBy).name} · ÷${e.split.length}</div></div>
      <div class="amt serif">${TRIP.currency}${e.amount}</div>
    </div>`;
  }).join('');

  const orcCat = TRIP.orcCat || {};
  const temOrcCat = Object.values(orcCat).some((x) => x > 0);
  const cats = Object.keys(CATEGORIES).map((k) => {
    const cat = CATEGORIES[k];
    const gasto = byCat[k] || 0;
    const limite = orcCat[k] || 0;
    if (gasto === 0 && limite === 0) return ''; // pula categoria sem gasto nem orçamento
    if (limite > 0) {
      const p = Math.round((gasto/limite)*100);
      const estourou = gasto > limite;
      return `<div class="catbar">
        <div class="top"><span class="l">${svg(cat.icon,15,cat.color)} ${cat.label}</span><span><b style="color:${estourou?C.clay:'var(--text)'}">${TRIP.currency}${gasto.toLocaleString('pt-BR')}</b> <span style="color:var(--sub)">de ${TRIP.currency}${limite.toLocaleString('pt-BR')}</span></span></div>
        <div class="bar"><span style="width:${Math.min(p,100)}%;background:${estourou?C.clay:cat.color}"></span></div>
        <div style="font-size:11.5px;color:${estourou?C.clay:'var(--sub)'};margin-top:3px">${estourou?`Estourou ${TRIP.currency}${(gasto-limite).toLocaleString('pt-BR')}`:`${p}% · restam ${TRIP.currency}${(limite-gasto).toLocaleString('pt-BR')}`}</div>
      </div>`;
    }
    // sem limite definido: comportamento antigo (% do total gasto)
    const p = total>0 ? Math.round((gasto/total)*100) : 0;
    return `<div class="catbar">
      <div class="top"><span class="l">${svg(cat.icon,15,cat.color)} ${cat.label}</span><span><b>${TRIP.currency}${gasto.toLocaleString('pt-BR')}</b> <span style="color:var(--sub)">· ${p}%</span></span></div>
      <div class="bar"><span style="width:${p}%;background:${cat.color}"></span></div>
    </div>`;
  }).join('');

  const balances = MEMBERS.map((m) => {
    const v = net[m.id]; const pos = v >= 0;
    return `<div class="balance-row">${avatar(m.id,30)}<span class="nm">${m.name}</span><span class="v" style="color:${pos?C.teal:C.clay}">${pos?'+':''}${TRIP.currency}${Math.abs(v).toFixed(0)}</span></div>`;
  }).join('');

  const txRows = tx.map((t) => `<div class="tx-row">${avatar(t.from,28)}<span class="nm">${member(t.from).name}</span>${svg('chevronright',16,'var(--sub)')}${avatar(t.to,28)}<span class="nm">${member(t.to).name}</span><span class="v">${TRIP.currency}${t.amount.toFixed(0)}</span></div>`).join('');

  // ---- Aba "Meu": orçamento pessoal do usuário logado ----
  const eu = MEMBERS.find((m) => m.id === meId());
  let meuPane = '';
  if (!eu) {
    meuPane = `<div class="empty">Entre na viagem para ver seu orçamento pessoal.</div>`;
  } else {
    const meuOrc = eu.orcamento || 0;
    // Minha parte em cada despesa em que entrei na divisão
    const minhas = EXPENSES.filter((e) => (e.split || []).map(String).includes(String(eu.id)))
      .map((e) => ({ ...e, minhaParte: e.amount / e.split.length }));
    const consumido = minhas.reduce((s, e) => s + e.minhaParte, 0);
    const sobra = meuOrc - consumido;
    const pctMeu = meuOrc > 0 ? Math.round((consumido / meuOrc) * 100) : 0;

    const linhas = minhas.length ? minhas.map((e) => {
      const cat = CATEGORIES[e.cat];
      const paguei = String(e.paidBy) === String(eu.id);
      return `<div class="expense">
        <div class="ico" style="background:${cat.color}18">${svg(cat.icon,18,cat.color)}</div>
        <div class="info"><div class="desc">${esc(e.desc)}</div><div class="meta">${esc(e.date)} · ÷${e.split.length}${paguei?' · você pagou':''}</div></div>
        <div class="amt serif">${TRIP.currency}${e.minhaParte.toFixed(2)}</div>
      </div>`;
    }).join('') : `<div class="empty">Você ainda não entrou em nenhuma despesa.</div>`;

    const semOrc = meuOrc === 0
      ? `<div style="font-size:12.5px;color:var(--sub);margin-top:8px;text-align:center">Seu orçamento pessoal ainda não foi definido. Peça a um admin para configurá-lo na tela Admin.</div>`
      : `<div class="track" style="margin-top:6px"><div class="fill" style="width:${Math.min(pctMeu,100)}%"></div></div>
         <div class="row-between" style="margin-top:12px;font-size:13px"><span style="color:var(--sub)">Gasto <b style="color:var(--text)">${TRIP.currency}${consumido.toFixed(2)}</b></span><span style="color:var(--sub)">de ${TRIP.currency}${meuOrc.toLocaleString('pt-BR')} · ${pctMeu}%</span></div>`;

    meuPane = `
      ${meuOrc>0 ? alertaBudget(consumido, meuOrc) : ''}
      <div class="card budget-summary">
        <div style="text-align:center;padding:4px 0 2px">
          <div style="font-size:12px;color:var(--sub)">${meuOrc>0 ? (sobra>=0?'Ainda sobra':'Você estourou') : 'Gasto por mim'}</div>
          <div class="saldo-big serif" style="color:${meuOrc===0?C.blue:(sobra>=0?C.teal:C.clay)}">${TRIP.currency}${meuOrc>0 ? Math.abs(sobra).toFixed(2) : consumido.toFixed(2)}</div>
        </div>
        ${semOrc}
      </div>
      <div style="font-size:12px;color:var(--sub);margin:4px 2px 8px"><span>${svg('eye',13,'var(--sub)')} Só você vê seu orçamento. Conta apenas sua parte na divisão.</span></div>
      <div class="list">${linhas}</div>`;
  }

  return `
    <h2 class="section-title serif">Orçamento &amp; Despesas</h2>
    ${alertaBudget(total, TRIP.budget||0)}
    <div class="card budget-summary">
      <div style="text-align:center;padding:4px 0 2px">
        <div style="font-size:12px;color:var(--sub)">${remaining>=0?'Saldo restante':'Acima do orçamento'}</div>
        <div class="saldo-big serif" style="color:${remaining>=0?C.teal:C.clay}">${TRIP.currency}${Math.abs(remaining).toLocaleString('pt-BR')}</div>
      </div>
      <div class="track" style="margin-top:6px"><div class="fill" style="width:${Math.min(pct,100)}%"></div></div>
      <div class="row-between" style="margin-top:12px;font-size:13px">
        <span style="color:var(--sub)">Gasto <b style="color:var(--text)">${TRIP.currency}${total.toLocaleString('pt-BR')}</b></span>
        <span style="color:var(--sub)">de ${TRIP.currency}${(TRIP.budget||0).toLocaleString('pt-BR')} · ${pct}%</span>
      </div>
    </div>
    <div class="tabs">
      <button class="tab ${budgetTab==='meu'?'active':''}" data-btab="meu">Meu</button>
      <button class="tab ${budgetTab==='gastos'?'active':''}" data-btab="gastos">Gastos</button>
      <button class="tab ${budgetTab==='categorias'?'active':''}" data-btab="categorias">Categoria</button>
      <button class="tab ${budgetTab==='acerto'?'active':''}" data-btab="acerto">Acerto</button>
    </div>
    <div class="tabpane ${budgetTab==='meu'?'active':''}">${meuPane}</div>
    <div class="tabpane ${budgetTab==='gastos'?'active':''}"><div class="list">${gastos}</div></div>
    <div class="tabpane ${budgetTab==='categorias'?'active':''}"><div class="card">${cats}</div></div>
    <div class="tabpane ${budgetTab==='acerto'?'active':''}">
      <div class="card"><div class="mini-label" style="margin-bottom:12px">Saldo por participante</div>${balances}</div>
      <div class="card"><div class="mini-label">Liquidação inteligente</div><div style="font-size:12px;color:var(--sub);margin:4px 0 14px">${tx.length} pagamentos resolvem todas as dívidas</div>${txRows}</div>
    </div>`;
}

// ============================================================
// RENDER: Itinerary
// ============================================================
let itinQuery = '';
let dayOpen = { 1: true, 2: true };
function renderItinerary() {
  const q = semAcento(itinQuery.trim());
  const filtered = ITINERARY.map((d) => ({
    ...d,
    items: q ? d.items.filter((it) => semAcento(it.name).includes(q) || semAcento(it.place).includes(q) || semAcento(d.city).includes(q)) : d.items,
  })).filter((d) => !q || d.items.length > 0);

  const daysHtml = filtered.map((d) => {
    const dayCost = d.items.reduce((s,i) => s+i.cost, 0);
    const isOpen = dayOpen[d.day] || !!q;
    const items = d.items.map((it) => {
      const cat = CATEGORIES[it.cat];
      const editavel = podeEditar(it.criadoPor);
      const temLocal = (it.place || '').trim();
      const btnMapa = temLocal ? `<button class="tl-map" data-map="${esc(it.place)}" title="Abrir no mapa">${svg('mappin',18,C.blue)}</button>` : '';
      return `<div class="tl-item">
        <div class="tl-dot" style="background:${cat.color}"></div>
        <div class="tl-card${editavel?' tl-clickable':''}"${editavel?` data-edit-day="${d.day}" data-edit-id="${esc(String(it.id))}"`:''}><div class="tl-time serif">${it.time}</div><div style="flex:1"><div class="tl-name">${esc(it.name)}</div><div class="tl-place">${esc(it.place)}</div></div>${it.cost>0?`<div class="tl-cost">${TRIP.currency}${it.cost}</div>`:''}${btnMapa}</div>
      </div>`;
    }).join('');
    return `<div class="day">
      <button class="day-head" data-day="${d.day}">
        <div class="day-badge"><span class="d1">DIA</span><span class="d2 serif">${d.day}</span></div>
        <div class="day-title"><div class="c">${esc(d.city)}</div><div class="m">${(() => { const ds = diaDaSemana(d.date); return ds ? ds.charAt(0).toUpperCase()+ds.slice(1)+' · ' : ''; })()}${d.date} · ${d.items.length} atividades · ${TRIP.currency}${dayCost}</div></div>
        <span class="day-chevron ${isOpen?'':'closed'}">${svg('chevrondown',20,'var(--sub)')}</span>
      </button>
      ${isOpen ? `<div class="timeline"><div class="spine"></div>${items}</div>` : ''}
    </div>`;
  }).join('');

  let empty = '';
  if (ITINERARY.length === 0) {
    empty = `<div class="empty">Nenhuma atividade no roteiro ainda.<br>Toque no + para adicionar a primeira.</div>`;
  } else if (filtered.length === 0) {
    empty = `<div class="empty">Nada encontrado para “${esc(itinQuery)}”. Tente outro termo.</div>`;
  }

  const searchBar = ITINERARY.length > 0 ? `
    <div class="search-wrap">
      ${svg('search',16)}
      <input id="itin-search" type="text" placeholder="Buscar atividade, local ou cidade" value="${esc(itinQuery)}">
      ${itinQuery ? `<button class="clear" id="itin-clear">${svg('x',16)}</button>` : ''}
    </div>` : '';

  const btnCusto = ITINERARY.length > 0 ? `
    <button class="roteiro-custo-btn" id="itin-custo">${svg('wallet',16)} Ver custo do roteiro</button>` : '';

  return `
    <h2 class="section-title serif">Cronograma diário</h2>
    ${searchBar}
    ${btnCusto}
    ${empty}${daysHtml}`;
}

// ============================================================
// RENDER: Memories
// ============================================================
// Comentários são guardados num texto: "Nome::texto ~~ Nome::texto"
function parseComentarios(txt) {
  if (!txt) return [];
  return String(txt).split(' ~~ ').filter(Boolean).map((c) => {
    const i = c.indexOf('::');
    return i >= 0 ? { nome: c.slice(0, i), texto: c.slice(i + 2) } : { nome: '', texto: c };
  });
}
function serializeComentarios(arr) {
  return arr.map((c) => `${c.nome}::${c.texto}`).join(' ~~ ');
}

// Curtir/descurtir um post (salva na planilha)
function toggleLike(postId) {
  const p = POSTS.find((x) => String(x.id) === String(postId));
  if (!p) return;
  const meu = String(meId());
  p.likedBy = p.likedBy || [];
  const idx = p.likedBy.map(String).indexOf(meu);
  if (idx >= 0) p.likedBy.splice(idx, 1); else p.likedBy.push(meu);
  p.likes = p.likedBy.length;
  SYNC.update('Memorias', postId, { likedBy: p.likedBy.slice(), likes: p.likes });
  render();
}

// Modal para adicionar um comentário
function openComentarioModal(postId) {
  const p = POSTS.find((x) => String(x.id) === String(postId));
  if (!p) return;
  let texto = '';
  const listaHtml = (p.comentarios || []).length
    ? (p.comentarios).map((c) => `<div class="cmt"><b>${esc(c.nome)}</b> ${esc(c.texto)}</div>`).join('')
    : `<div style="font-size:13px;color:var(--sub)">Ainda sem comentários. Seja o primeiro!</div>`;
  overlay().innerHTML = `<div class="modal">
    <div class="modal-grab"></div>
    <div class="modal-head"><h3 class="serif">Comentários</h3><button id="m-close">${svg('x',20)}</button></div>
    <div class="post-comments" style="max-height:240px;overflow:auto;margin-bottom:12px">${listaHtml}</div>
    <textarea class="field" id="f-cmt" rows="3" placeholder="Escreva um comentário..."></textarea>
    <button class="primary-btn" id="m-send" disabled>Comentar</button>
  </div>`;
  overlay().classList.remove('hidden');
  $('#m-close').onclick = closeModal;
  $('#f-cmt').oninput = (e) => { texto = e.target.value; $('#m-send').disabled = !texto.trim(); };
  $('#m-send').onclick = () => {
    if (!texto.trim()) return;
    const nome = member(meId()).name || 'Você';
    p.comentarios = p.comentarios || [];
    p.comentarios.push({ nome, texto: texto.trim() });
    p.comments = p.comentarios.length;
    SYNC.update('Memorias', postId, { comentariosTexto: serializeComentarios(p.comentarios), comments: p.comments });
    closeModal(); render();
  };
}

let liked = {};
function renderMemories() {
  const posts = POSTS.map((p) => {
    const meuId = meId();
    const curtidores = (p.likedBy || []);
    const euCurti = curtidores.map(String).includes(String(meuId));
    const numComentarios = (p.comentarios || []).length;
    return `<div class="post">
      <div class="post-head">${avatar(p.author,38)}<div class="who"><div class="n">${member(p.author).name}</div><div class="t">${esc(p.trip)} · ${esc(p.time)}</div></div>${svg('globe',16,'var(--sub)')}</div>
      ${p.foto
        ? `<div class="post-cover post-cover-foto"><img src="${esc(p.foto)}" alt="foto da publicação" loading="lazy"></div>`
        : p.aguardandoFoto
          ? `<div class="post-cover" style="background:${p.grad}"><div class="foto-loading"><div class="spinner"></div>Enviando foto...</div></div>`
          : `<div class="post-cover" style="background:${p.grad}">${svg('camera',40)}</div>`}
      <div class="post-body">
        <p>${esc(p.text)}</p>
        <div class="post-tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join('')}</div>
        <div class="post-actions">
          <button data-like="${p.id}" class="${euCurti?'liked':''}">${(euCurti?svgFill:svg)('heart',17,euCurti?C.clay:'currentColor')} ${curtidores.length}</button>
          <button data-comment="${p.id}">${svg('message',17)} ${numComentarios}</button>
        </div>
        ${numComentarios ? `<div class="post-comments">${(p.comentarios).map((c) => `<div class="cmt"><b>${esc(c.nome)}</b> ${esc(c.texto)}</div>`).join('')}</div>` : ''}
      </div>
    </div>`;
  }).join('');
  const vazio = POSTS.length === 0
    ? `<div class="empty memories-empty">
        ${svg('camera',40,'var(--sub)')}
        <div class="memories-empty-title">Nenhuma memória ainda</div>
        <div>Compartilhe os momentos da viagem! Toque no <b>+</b> para publicar uma foto e escrever algo sobre ela.</div>
      </div>`
    : '';
  return `<h2 class="section-title serif">Memórias</h2>${posts}${vazio}`;
}

// ============================================================
// RENDER: Admin
// ============================================================
function renderAdmin() {
  const pending = PENDING.length ? PENDING.map((p) => `<div class="pending-row">
    <div class="avatar" style="width:36px;height:36px;background:${p.color};font-size:12px">${p.initials}</div>
    <div class="info"><div class="nm">${esc(p.name)}</div><div class="kd">${esc(p.kind)} · ${esc(p.time)}</div></div>
    <button class="circle-btn ok" data-approve="${p.id}">${svg('check',17,'#fff')}</button>
    <button class="circle-btn no" data-reject="${p.id}">${svg('x',17)}</button>
  </div>`).join('') : `<div style="font-size:13px;color:var(--sub)">Nada para aprovar agora.</div>`;

  const members = MEMBERS.map((m) => `<div class="member-row">
    <div class="member-main">${avatar(m.id,36)}
      <div class="info"><div class="nm">${m.name}${m.admin?svgFill('crown',13,C.gold):''}</div><div class="role">${m.admin?'Administrador':'Participante'}</div></div>
      ${!m.admin?`<button class="trash" data-remove="${m.id}">${svg('trash',16)}</button>`:''}
    </div>
    <div class="member-perms">
      <button class="pill ${m.admin?'on':''}" data-toggle-admin="${m.id}">${svg('shield',12)} Admin</button>
      <button class="pill ${m.canExpense?'on':''}" data-toggle-expense="${m.id}">${svg('wallet',12)} Lançar gastos</button>
    </div>
    <div class="member-budget">
      <span class="lbl">Orçamento pessoal (${TRIP.currency})</span>
      <input class="budget-input" type="number" min="0" placeholder="0" value="${m.orcamento||''}" data-budget="${m.id}">
    </div>
  </div>`).join('');

  return `
    <h2 class="section-title serif">Painel do admin</h2>
    <div class="card admin-block">
      <div class="mini-label admin-title" style="margin-bottom:14px">${svg('bell',14)} Aprovações pendentes ${PENDING.length?`<span class="badge-count">${PENDING.length}</span>`:''}</div>
      ${pending}
    </div>
    <div class="card admin-block">
      <div class="mini-label admin-title" style="margin-bottom:6px">${svg('userplus',14)} Convidar por código</div>
      <div style="font-size:12.5px;color:var(--sub);margin-bottom:12px">Compartilhe este código. Quem digitá-lo entra direto, sem precisar de aprovação.</div>
      <div class="invite-code-box">
        <code class="invite-code" id="invite-code">${inviteCode(TRIP)}</code>
        <button class="copy-btn" id="copy-code">${svg('copy',15)} Copiar</button>
      </div>
    </div>
    <div class="card admin-block">
      <div class="mini-label admin-title" style="margin-bottom:14px">${svg('users',14)} Participantes</div>
      ${members}
    </div>
    <div class="card admin-block">
      <div class="mini-label admin-title" style="margin-bottom:6px">${svg('wallet',14)} Orçamento por categoria</div>
      <div style="font-size:12.5px;color:var(--sub);margin-bottom:12px">Defina um limite para cada tipo de gasto da viagem (opcional). Deixe 0 para não limitar.</div>
      ${Object.keys(CATEGORIES).map((k) => {
        const cat = CATEGORIES[k];
        const val = (TRIP.orcCat && TRIP.orcCat[k]) || '';
        return `<div class="member-budget" style="padding-left:0">
          <span class="lbl">${svg(cat.icon,14,cat.color)} ${cat.label}</span>
          <input class="budget-input" type="number" min="0" placeholder="0" value="${val}" data-orccat="${k}">
        </div>`;
      }).join('')}
      <button class="primary-btn" id="adm-save-cat" style="margin-top:14px">Salvar orçamentos por categoria</button>
    </div>
    <div class="card admin-block">
      <div class="mini-label admin-title" style="margin-bottom:14px">${svg('settings',14)} Dados da viagem</div>
      <div class="field-label">Nome</div><input class="field" id="adm-name" value="${esc(TRIP.name)}">
      <div class="field-label mt12">Destino</div><input class="field" id="adm-dest" value="${esc(TRIP.destination)}">
      <div class="two-col"><div><div class="field-label mt12">Início</div><input class="field" type="date" id="adm-start" value="${TRIP.start}"></div><div><div class="field-label mt12">Término</div><input class="field" type="date" id="adm-end" value="${TRIP.end}"></div></div>
      <div class="field-label mt12">Orçamento total (${TRIP.currency})</div><input class="field" type="number" id="adm-budget" value="${TRIP.budget}">
      <button class="primary-btn" id="adm-save">Salvar alterações</button>
    </div>`;
}

// ============================================================
// RENDER: Sincronização (Google Sheets)
// ============================================================
function renderSync() {
  const url = SYNC.url;
  const statusMap = {
    off: { txt: 'Não conectado', color: 'var(--sub)' },
    carregando: { txt: 'Carregando...', color: C.gold },
    ok: { txt: 'Conectado ✓', color: C.teal },
    erro: { txt: 'Erro ao conectar', color: C.clay },
  };
  const st = statusMap[SYNC.status] || statusMap.off;
  const u = AUTH.user;
  const accountBlock = u ? `
    <div class="card">
      <div class="mini-label" style="margin-bottom:12px">Sua conta</div>
      <div style="display:flex;align-items:center;gap:12px">
        <div class="avatar" style="width:44px;height:44px;background:${u.color};font-size:15px;overflow:hidden">${u.picture?`<img src="${u.picture}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`:u.initials}</div>
        <div style="flex:1;min-width:0"><div style="font-weight:600">${esc(u.fullName || u.name)}</div><div style="font-size:12px;color:var(--sub)">${esc(u.email || 'sessão local')}</div></div>
      </div>
      <button class="primary-btn" id="logout-btn" style="background:var(--clay)">Sair da conta</button>
    </div>` : '';
  return `
    <h2 class="section-title serif">Planilha &amp; conta</h2>
    ${accountBlock}
    <div class="card">
      <div class="row-between"><span style="font-size:13px;color:var(--sub)">Status da planilha</span><span style="font-weight:700;color:${st.color}">${st.txt}</span></div>
      <button class="primary-btn" id="sync-reload" style="background:var(--teal);margin-top:14px">Recarregar dados da planilha</button>
      <div style="font-size:12px;color:var(--sub);margin-top:12px">O app também atualiza sozinho a cada 1 minuto.</div>
    </div>
    <div style="text-align:center;font-size:12px;color:var(--sub);margin:8px 0 4px">Stigmés · versão ${APP_VERSION}</div>`;
}

// ============================================================
// Navegação e re-render
// ============================================================
const SCREENS = { trips: renderTrips, home: renderDashboard, budget: renderBudget, itinerary: renderItinerary, memories: renderMemories, admin: renderAdmin, sync: renderSync };
let current = 'trips';

function render() {
  // Telas que exigem uma viagem aberta; sem TRIP, cai na lista
  const needsTrip = ['home','budget','itinerary','memories','admin'];
  if (!TRIP && needsTrip.includes(current)) current = 'trips';
  // Tela admin é só para administradores da viagem
  if (current === 'admin' && !meIsAdmin()) current = 'home';

  $('#content').innerHTML = SCREENS[current]();
  // FAB
  const fab = $('#fab');
  if (current === 'trips') { fab.style.display = 'flex'; fab.setAttribute('aria-label','Nova viagem'); fab.dataset.action = 'trip'; }
  else if (current === 'budget' && TRIP) { fab.style.display = 'flex'; fab.setAttribute('aria-label','Adicionar despesa'); fab.dataset.action = 'expense'; }
  else if (current === 'itinerary' && TRIP) { fab.style.display = 'flex'; fab.setAttribute('aria-label','Adicionar atividade'); fab.dataset.action = 'activity'; }
  else if (current === 'memories' && TRIP) { fab.style.display = 'flex'; fab.setAttribute('aria-label','Nova publicação'); fab.dataset.action = 'post'; }
  else { fab.style.display = 'none'; }
  // barra de navegação: escondida na lista de viagens (não há viagem aberta)
  $('.nav').style.display = (current === 'trips' && !TRIP) ? 'none' : '';
  // botão Admin só aparece para administradores da viagem
  const adminBtn = document.querySelector('.nav button[data-nav="admin"]');
  if (adminBtn) adminBtn.style.display = (TRIP && meIsAdmin()) ? '' : 'none';
  document.querySelectorAll('.nav button').forEach((b) => b.classList.toggle('active', b.dataset.nav === current));
  bindScreenEvents();
}

function bindScreenEvents() {
  // Lista de viagens
  document.querySelectorAll('[data-open]').forEach((b) => b.onclick = () => openTrip(b.dataset.open, true));
  document.querySelectorAll('[data-open-card]').forEach((c) => c.onclick = (ev) => {
    if (ev.target.closest('button')) return; // não interfere no botão Abrir
    openTrip(c.dataset.openCard, true);
  });
  const openCode = $('#open-code');
  if (openCode) openCode.onclick = () => openCodeModal();
  document.querySelectorAll('[data-join]').forEach((b) => b.onclick = async () => {
    const tripId = b.dataset.join;
    b.textContent = 'Enviando pedido...';
    if (AUTH.user) {
      await SYNC.save('Participantes', { tripId: tripId, userId: AUTH.user.id, papel: 'participante', canExpense: true, status: 'pendente' });
      await SYNC.load();
    }
    render();
  });
  const heroBack = $('#hero-back');
  if (heroBack) heroBack.onclick = () => closeTrip();
  // Budget tabs
  document.querySelectorAll('[data-btab]').forEach((b) => b.onclick = () => { budgetTab = b.dataset.btab; render(); });
  document.querySelectorAll('[data-edit-expense]').forEach((b) => b.onclick = () => {
    const e = EXPENSES.find((x) => String(x.id) === String(b.dataset.editExpense));
    if (e) openExpenseModal(e);
  });
  // Itinerary search
  const s = $('#itin-search');
  if (s) s.oninput = (e) => { itinQuery = e.target.value; const pos = e.target.selectionStart; render(); const n = $('#itin-search'); if (n) { n.focus(); n.setSelectionRange(pos,pos); } };
  const clr = $('#itin-clear');
  if (clr) clr.onclick = () => { itinQuery = ''; render(); };
  const custoBtn = $('#itin-custo');
  if (custoBtn) custoBtn.onclick = () => openRoteiroResumo();
  document.querySelectorAll('[data-day]').forEach((b) => b.onclick = () => { const d = +b.dataset.day; dayOpen[d] = !dayOpen[d]; render(); });
  document.querySelectorAll('[data-edit-id]').forEach((b) => b.onclick = () => {
    const dayNum = +b.dataset.editDay;
    const id = b.dataset.editId;
    const day = ITINERARY.find((x) => x.day === dayNum);
    const item = day && day.items.find((it) => String(it.id) === String(id));
    if (item) openActivityModal(item, dayNum);
  });
  // Botão de mapa: abre menu Waze / Google Maps (não dispara a edição)
  document.querySelectorAll('[data-map]').forEach((b) => b.onclick = (ev) => {
    ev.stopPropagation();
    openMapaModal(b.dataset.map);
  });
  // Likes e comentários (salvam na planilha)
  document.querySelectorAll('[data-like]').forEach((b) => b.onclick = () => toggleLike(b.dataset.like));
  document.querySelectorAll('[data-comment]').forEach((b) => b.onclick = () => openComentarioModal(b.dataset.comment));
  // Admin actions — só ligadas se o usuário logado for admin da viagem.
  // Participante não altera nada, mesmo que a tela apareça por algum motivo.
  if (meIsAdmin()) {
  const copyBtn = $('#copy-code');
  if (copyBtn) copyBtn.onclick = () => {
    const code = $('#invite-code') ? $('#invite-code').textContent : '';
    const done = () => { copyBtn.innerHTML = svg('check',15) + ' Copiado!'; setTimeout(() => { copyBtn.innerHTML = svg('copy',15) + ' Copiar'; }, 1600); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(code).then(done).catch(done);
    else done();
  };
  document.querySelectorAll('[data-approve]').forEach((b) => b.onclick = () => {
    const p = PENDING.find((x) => x.id === b.dataset.approve);
    if (!p) return;
    const novo = { id: p.id, partId: p.partId, name: (p.name||'Usuário').split(/\s+/)[0], initials: p.initials, color: p.color, admin: false, canExpense: true, orcamento: 0 };
    MEMBERS.push(novo);
    // Já existe como pendente: só muda o status para ativo
    if (p.partId) SYNC.update('Participantes', p.partId, { status: 'ativo' });
    PENDING = PENDING.filter((x) => x.id !== b.dataset.approve); render();
  });
  document.querySelectorAll('[data-reject]').forEach((b) => b.onclick = () => {
    const p = PENDING.find((x) => x.id === b.dataset.reject);
    if (p && p.partId) SYNC.remove('Participantes', p.partId);
    PENDING = PENDING.filter((x) => x.id !== b.dataset.reject); render();
  });
  document.querySelectorAll('[data-remove]').forEach((b) => b.onclick = () => { MEMBERS = MEMBERS.filter((m) => m.id !== b.dataset.remove); render(); });
  document.querySelectorAll('[data-toggle-admin]').forEach((b) => b.onclick = () => { const m = MEMBERS.find((x) => x.id === b.dataset.toggleAdmin); m.admin = !m.admin; if (m.partId) SYNC.update('Participantes', m.partId, { papel: m.admin ? 'admin' : 'participante' }); render(); });
  document.querySelectorAll('[data-toggle-expense]').forEach((b) => b.onclick = () => { const m = MEMBERS.find((x) => x.id === b.dataset.toggleExpense); m.canExpense = !m.canExpense; if (m.partId) SYNC.update('Participantes', m.partId, { canExpense: m.canExpense }); render(); });
  document.querySelectorAll('[data-budget]').forEach((inp) => inp.onchange = () => {
    const m = MEMBERS.find((x) => x.id === inp.dataset.budget);
    if (!m) return;
    m.orcamento = Number(inp.value) || 0;
    if (m.partId) SYNC.update('Participantes', m.partId, { orcamento: m.orcamento });
  });
  const save = $('#adm-save');
  if (save) save.onclick = () => {
    TRIP.name = $('#adm-name').value; TRIP.destination = $('#adm-dest').value;
    TRIP.start = $('#adm-start').value; TRIP.end = $('#adm-end').value; TRIP.budget = +$('#adm-budget').value;
    SYNC.update('Viagens', TRIP.id, { nome: TRIP.name, destino: TRIP.destination, inicio: TRIP.start, fim: TRIP.end, orcamento: TRIP.budget });
    save.textContent = 'Salvo ✓'; setTimeout(() => { save.textContent = 'Salvar alterações'; }, 1500);
  };
  const saveCat = $('#adm-save-cat');
  if (saveCat) saveCat.onclick = () => {
    if (!TRIP.orcCat) TRIP.orcCat = {};
    document.querySelectorAll('[data-orccat]').forEach((inp) => { TRIP.orcCat[inp.dataset.orccat] = Number(inp.value) || 0; });
    SYNC.update('Viagens', TRIP.id, {
      orcTransporte: TRIP.orcCat.transporte, orcHospedagem: TRIP.orcCat.hospedagem,
      orcAlimentacao: TRIP.orcCat.alimentacao, orcPasseios: TRIP.orcCat.passeios, orcOutros: TRIP.orcCat.outros,
    });
    saveCat.textContent = 'Salvo ✓'; setTimeout(() => { saveCat.textContent = 'Salvar orçamentos por categoria'; }, 1500);
  };
  }
  // Sync screen
  const syncReload = $('#sync-reload');
  if (syncReload) syncReload.onclick = async () => {
    syncReload.textContent = 'Recarregando...';
    await SYNC.load();
    render();
  };
  const logoutBtn = $('#logout-btn');
  if (logoutBtn) logoutBtn.onclick = () => AUTH.signOut();
}

// ============================================================
// Modais
// ============================================================
const overlay = () => $('#modal-overlay');
function closeModal() { overlay().classList.add('hidden'); overlay().innerHTML = ''; }

function openCodeModal() {
  let code = '';
  overlay().innerHTML = `<div class="modal">
    <div class="modal-grab"></div>
    <div class="modal-head"><h3 class="serif">Entrar com código</h3><button id="m-close">${svg('x',20)}</button></div>
    <div style="font-size:13px;color:var(--sub);margin-bottom:12px">Digite o código que o organizador da viagem te enviou. Você entra na hora, sem esperar aprovação.</div>
    <div class="field-label">Código da viagem</div>
    <input class="field" id="f-code" placeholder="Ex.: ESPANHA2026" style="text-transform:uppercase" autocomplete="off">
    <div id="code-msg" style="font-size:12.5px;color:var(--clay);margin-top:8px;min-height:16px"></div>
    <button class="primary-btn" id="m-join" disabled>Entrar na viagem</button>
  </div>`;
  overlay().classList.remove('hidden');
  $('#m-close').onclick = closeModal;
  const inp = $('#f-code');
  inp.oninput = (e) => { code = e.target.value.trim().toUpperCase(); const b = $('#m-join'); if (b) b.disabled = !code; $('#code-msg').textContent = ''; };
  $('#m-join').onclick = async () => {
    const norm = (s) => (s || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    const alvo = TRIPS.find((t) => norm(inviteCode(t)) === norm(code));
    if (!alvo) { $('#code-msg').textContent = 'Código não encontrado. Confira com o organizador.'; return; }
    if (myStatus(alvo.id) === 'ativo') { $('#code-msg').style.color = C.teal; $('#code-msg').textContent = 'Você já participa desta viagem.'; return; }
    const btn = $('#m-join'); btn.disabled = true; btn.textContent = 'Entrando...';
    if (AUTH.user) {
      await SYNC.save('Participantes', { tripId: alvo.id, userId: AUTH.user.id, papel: 'participante', canExpense: true, status: 'ativo' });
      await SYNC.load();
    }
    closeModal();
    openTrip(alvo.id, true);
  };
  setTimeout(() => { const n = $('#f-code'); if (n) n.focus(); }, 50);
}

function openExpenseModal(editExp) {
  const isEdit = !!editExp;
  let form = isEdit
    ? { desc: editExp.desc || '', amount: String(editExp.amount || ''), cat: editExp.cat || 'alimentacao',
        date: '', paidBy: editExp.paidBy, split: (editExp.split || []).slice(), editId: editExp.id }
    : { desc: '', amount: '', cat: 'alimentacao', date: '', paidBy: meId(), split: MEMBERS.map((m) => m.id) };
  function draw() {
    const catChips = Object.entries(CATEGORIES).map(([k,c]) => `<button class="chip ${form.cat===k?'on':''}" data-cat="${k}" style="${form.cat===k?`border-color:${c.color};background:${c.color}18;color:${c.color}`:''}">${svg(c.icon,14,form.cat===k?c.color:'currentColor')} ${c.label}</button>`).join('');
    const payChips = MEMBERS.map((m) => `<button class="chip pay ${form.paidBy===m.id?'on':''}" data-pay="${m.id}" style="${form.paidBy===m.id?`border-color:${C.blue};background:${C.blue}15;color:${C.blue}`:''}">${avatar(m.id,24)} ${m.name}</button>`).join('');
    const splitChips = MEMBERS.map((m) => { const on = form.split.includes(m.id); return `<button class="chip split ${on?'on':''}" data-split="${m.id}" style="${on?`border-color:${C.teal};background:${C.teal}18;color:${C.teal}`:''}">${(on?svgFill:svg)(on?'checkcircle':'circle',16,on?C.teal:'currentColor')} ${avatar(m.id,24)} ${m.name}</button>`; }).join('');
    const perPerson = form.split.length && +form.amount ? `${TRIP.currency}${(+form.amount/form.split.length).toFixed(2)} por pessoa` : '';
    const valid = form.desc.trim() && +form.amount && form.split.length;
    overlay().innerHTML = `<div class="modal">
      <div class="modal-grab"></div>
      <div class="modal-head"><h3 class="serif">${isEdit ? 'Editar despesa' : 'Nova despesa'}</h3><button id="m-close">${svg('x',20)}</button></div>
      <div class="field-label">Descrição</div><input class="field" id="f-desc" placeholder="Ex.: Hotel em Paris" value="${esc(form.desc)}">
      <div class="two-col"><div><div class="field-label mt14">Valor (${TRIP.currency})</div><input class="field" id="f-amount" type="number" placeholder="0" value="${form.amount}"></div><div><div class="field-label mt14">Data</div><input class="field" id="f-date" type="date" value="${form.date}"></div></div>
      <div class="field-label mt14">Categoria</div><div class="chips">${catChips}</div>
      <div class="field-label mt14">Quem pagou</div><div class="chips">${payChips}</div>
      <div class="row-between mt14"><span class="field-label">Dividir entre · igualitária</span><span class="per-person" id="per-person">${perPerson}</span></div><div class="chips">${splitChips}</div>
      <button class="primary-btn" id="m-save" ${valid?'':'disabled'}>${isEdit ? 'Salvar alterações' : 'Adicionar despesa'}</button>
      ${isEdit ? `<button class="primary-btn" id="m-delete" style="background:var(--clay);margin-top:10px">Excluir despesa</button>` : ''}
    </div>`;
    overlay().classList.remove('hidden');
    $('#m-close').onclick = closeModal;
    $('#f-desc').oninput = (e) => { form.desc = e.target.value; syncSaveBtn(); };
    $('#f-amount').oninput = (e) => { form.amount = e.target.value; updatePerPerson(); syncSaveBtn(); };
    $('#f-date').onchange = (e) => { form.date = e.target.value; };
    document.querySelectorAll('[data-cat]').forEach((b) => b.onclick = () => { form.cat = b.dataset.cat; draw(); });
    document.querySelectorAll('[data-pay]').forEach((b) => b.onclick = () => { form.paidBy = b.dataset.pay; draw(); });
    document.querySelectorAll('[data-split]').forEach((b) => b.onclick = () => { const id = b.dataset.split; form.split = form.split.includes(id) ? form.split.filter((x) => x!==id) : [...form.split, id]; draw(); });
    function syncSaveBtn() { const ok = form.desc.trim() && +form.amount && form.split.length; const btn = $('#m-save'); if (btn) btn.disabled = !ok; }
    function updatePerPerson() {
      const el = $('#per-person');
      if (el) el.textContent = (form.split.length && +form.amount) ? `${TRIP.currency}${(+form.amount/form.split.length).toFixed(2)} por pessoa` : '';
    }
    const del = $('#m-delete');
    if (del) del.onclick = () => {
      EXPENSES = EXPENSES.filter((e) => String(e.id) !== String(form.editId));
      SYNC.remove('Despesas', form.editId);
      closeModal(); render();
    };
    $('#m-save').onclick = () => {
      if (!(form.desc.trim() && +form.amount && form.split.length)) return;

      if (isEdit) {
        const e = EXPENSES.find((x) => String(x.id) === String(form.editId));
        if (e) {
          e.desc = form.desc.trim(); e.cat = form.cat; e.amount = +form.amount;
          e.paidBy = form.paidBy; e.split = form.split.slice();
          if (form.date) e.date = new Date(form.date).toLocaleDateString('pt-BR',{day:'2-digit',month:'short'}).replace('.','');
        }
        SYNC.update('Despesas', form.editId, {
          desc: form.desc.trim(), cat: form.cat, amount: +form.amount,
          paidBy: form.paidBy, split: form.split.slice(),
          ...(form.date ? { date: new Date(form.date).toLocaleDateString('pt-BR',{day:'2-digit',month:'short'}).replace('.','') } : {}),
        });
        closeModal(); render();
        return;
      }

      const date = form.date ? new Date(form.date).toLocaleDateString('pt-BR',{day:'2-digit',month:'short'}).replace('.','') : 'Hoje';
      const novo = { id: Date.now(), tripId: TRIP.id, desc: form.desc.trim(), cat: form.cat, amount: +form.amount, paidBy: form.paidBy, split: form.split.slice(), date, criadoPor: meId() };
      EXPENSES.unshift(novo);
      SYNC.save('Despesas', novo);
      closeModal(); render();
    };
  }
  draw();
}

function openActivityModal(editItem, editDay) {
  const isEdit = !!editItem;
  const temDias = ITINERARY.length > 0;
  let form = isEdit
    ? { modo: 'existente', day: String(editDay), novoDia: '', novaData: '', novaCidade: '',
        time: editItem.time || '', name: editItem.name || '', place: editItem.place || '',
        cost: editItem.cost != null ? String(editItem.cost) : '', cat: editItem.cat || 'passeios',
        editId: editItem.id, editDay: editDay }
    : { modo: temDias ? 'existente' : 'novo',
        day: temDias ? String(ITINERARY[0].day) : '',
        novoDia: temDias ? String(Math.max.apply(null, ITINERARY.map((d) => d.day)) + 1) : '1',
        novaData: '', novaCidade: '',
        time: '', name: '', place: '', cost: '', cat: 'passeios' };
  function draw() {
    const dayOpts = ITINERARY.map((d) => `<option value="${d.day}" ${+form.day===d.day?'selected':''}>Dia ${d.day} · ${esc(d.city)} (${esc(d.date)})</option>`).join('');
    const catChips = Object.entries(CATEGORIES).map(([k,c]) => `<button class="chip ${form.cat===k?'on':''}" data-cat="${k}" style="${form.cat===k?`border-color:${c.color};background:${c.color}18;color:${c.color}`:''}">${svg(c.icon,14,form.cat===k?c.color:'currentColor')} ${c.label}</button>`).join('');

    // seletor de "onde adicionar": dia existente ou novo dia (só ao criar)
    const escolha = (temDias && !isEdit) ? `
      <div class="field-label">Onde adicionar</div>
      <div class="chips" style="margin-bottom:4px">
        <button class="chip ${form.modo==='existente'?'on':''}" data-modo="existente" style="${form.modo==='existente'?`border-color:${C.blue};background:${C.blue}15;color:${C.blue}`:''}">Dia existente</button>
        <button class="chip ${form.modo==='novo'?'on':''}" data-modo="novo" style="${form.modo==='novo'?`border-color:${C.blue};background:${C.blue}15;color:${C.blue}`:''}">Novo dia</button>
      </div>` : '';

    const blocoExistente = (temDias && form.modo === 'existente' && !isEdit)
      ? `<div class="field-label mt14">Dia</div><select class="field" id="f-day">${dayOpts}</select>`
      : '';

    const blocoNovo = (form.modo === 'novo')
      ? `<div class="two-col"><div><div class="field-label mt14">Nº do dia</div><input class="field" id="f-novodia" type="number" value="${esc(form.novoDia)}"></div><div><div class="field-label mt14">Data</div><input class="field" id="f-novadata" type="date" value="${form.novaData}"></div></div>
         <div class="field-label mt14">Cidade</div><input class="field" id="f-novacidade" placeholder="Ex.: Paris" value="${esc(form.novaCidade)}">`
      : '';

    const valid = form.name.trim() && form.time.trim() && (form.modo === 'existente' ? !!form.day : (form.novoDia && form.novaCidade.trim()));

    overlay().innerHTML = `<div class="modal">
      <div class="modal-grab"></div>
      <div class="modal-head"><h3 class="serif">${isEdit ? 'Editar atividade' : 'Nova atividade'}</h3><button id="m-close">${svg('x',20)}</button></div>
      ${escolha}${blocoExistente}${blocoNovo}
      <div class="two-col"><div><div class="field-label mt14">Horário</div><input class="field" id="f-time" type="time" value="${form.time}"></div><div><div class="field-label mt14">Valor estimado (${TRIP.currency})</div><input class="field" id="f-cost" type="number" placeholder="0" value="${form.cost}"></div></div>
      <div class="field-label mt14">Atividade</div><input class="field" id="f-name" placeholder="Ex.: Museu do Louvre" value="${esc(form.name)}">
      <div class="field-label mt14">Local / endereço</div><input class="field" id="f-place" placeholder="Ex.: Rue de Rivoli" value="${esc(form.place)}">
      <div class="field-label mt14">Categoria</div><div class="chips">${catChips}</div>
      <button class="primary-btn" id="m-save" ${valid?'':'disabled'}>${isEdit ? 'Salvar alterações' : 'Adicionar ao roteiro'}</button>
      ${isEdit ? `<button class="primary-btn" id="m-delete" style="background:var(--clay);margin-top:10px">Excluir atividade</button>` : ''}
    </div>`;
    overlay().classList.remove('hidden');
    $('#m-close').onclick = closeModal;
    document.querySelectorAll('[data-modo]').forEach((b) => b.onclick = () => { form.modo = b.dataset.modo; draw(); });
    if ($('#f-day')) $('#f-day').onchange = (e) => { form.day = e.target.value; };
    if ($('#f-novodia')) $('#f-novodia').oninput = (e) => { form.novoDia = e.target.value; syncValid(); };
    if ($('#f-novadata')) $('#f-novadata').onchange = (e) => { form.novaData = e.target.value; syncValid(); };
    if ($('#f-novacidade')) $('#f-novacidade').oninput = (e) => { form.novaCidade = e.target.value; syncValid(); };
    $('#f-time').oninput = (e) => { form.time = e.target.value; syncValid(); };
    $('#f-cost').oninput = (e) => { form.cost = e.target.value; };
    $('#f-name').oninput = (e) => { form.name = e.target.value; syncValid(); };
    $('#f-place').oninput = (e) => { form.place = e.target.value; };
    document.querySelectorAll('[data-cat]').forEach((b) => b.onclick = () => { form.cat = b.dataset.cat; draw(); });
    // Revalida o botão sem reconstruir o modal (evita perder o foco / "pular")
    function syncValid() {
      const ok = form.name.trim() && form.time.trim() && (form.modo === 'existente' ? !!form.day : (form.novoDia && form.novaCidade.trim()));
      const btn = $('#m-save'); if (btn) btn.disabled = !ok;
    }
    // Excluir (só no modo edição)
    const del = $('#m-delete');
    if (del) del.onclick = () => {
      const day = ITINERARY.find((x) => x.day === +form.editDay);
      if (day) day.items = day.items.filter((it) => String(it.id) !== String(form.editId));
      // remove o dia se ficou vazio
      const idx = ITINERARY.findIndex((x) => x.day === +form.editDay);
      if (idx >= 0 && ITINERARY[idx].items.length === 0) ITINERARY.splice(idx, 1);
      SYNC.remove('Roteiro', form.editId);
      closeModal(); render();
    };
    $('#m-save').onclick = () => {
      if (!(form.name.trim() && form.time.trim())) return;

      if (isEdit) {
        // Atualiza a atividade existente (mantém o dia)
        const day = ITINERARY.find((x) => x.day === +form.editDay);
        if (day) {
          const it = day.items.find((x) => String(x.id) === String(form.editId));
          if (it) {
            it.time = form.time; it.name = form.name.trim(); it.place = form.place.trim();
            it.cost = +form.cost || 0; it.cat = form.cat;
            day.items.sort((a,b) => a.time.localeCompare(b.time));
          }
        }
        SYNC.update('Roteiro', form.editId, {
          time: form.time, name: form.name.trim(), place: form.place.trim(),
          cost: +form.cost || 0, cat: form.cat,
        });
        closeModal(); render();
        return;
      }

      // Criação
      let dayNum, dayDate, dayCity;
      if (form.modo === 'existente') {
        const d = ITINERARY.find((x) => x.day === +form.day);
        if (!d) return;
        dayNum = d.day; dayDate = d.date; dayCity = d.city;
      } else {
        dayNum = +form.novoDia || (ITINERARY.length ? Math.max.apply(null, ITINERARY.map((d) => d.day)) + 1 : 1);
        dayDate = form.novaData ? new Date(form.novaData).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', '') : '';
        dayCity = form.novaCidade.trim();
      }
      let day = ITINERARY.find((x) => x.day === dayNum);
      if (!day) { day = { day: dayNum, date: dayDate, city: dayCity, items: [] }; ITINERARY.push(day); ITINERARY.sort((a,b) => a.day - b.day); }
      const novoId = Date.now();
      const item = { id: novoId, time: form.time, name: form.name.trim(), place: form.place.trim(), cost: +form.cost||0, cat: form.cat, criadoPor: meId() };
      day.items.push(item);
      day.items.sort((a,b) => a.time.localeCompare(b.time));
      dayOpen[day.day] = true;
      SYNC.save('Roteiro', { id: novoId, tripId: TRIP.id, day: day.day, date: day.date, city: day.city, time: item.time, name: item.name, place: item.place, cost: item.cost, cat: item.cat, criadoPor: meId() });
      closeModal(); render();
    };
  }
  draw();
}

// Modal: resumo do custo estimado do roteiro (por categoria vs orçamento)
function openRoteiroResumo() {
  // Soma o custo estimado de todas as atividades, por categoria
  const porCat = {};
  let totalRoteiro = 0;
  ITINERARY.forEach((d) => (d.items || []).forEach((it) => {
    const c = Number(it.cost) || 0;
    if (c <= 0) return;
    const k = it.cat || 'outros';
    porCat[k] = (porCat[k] || 0) + c;
    totalRoteiro += c;
  }));

  const orcTotal = TRIP.budget || 0;
  const orcCat = TRIP.orcCat || {};
  const sobra = orcTotal - totalRoteiro;

  const linhasCat = Object.keys(CATEGORIES).map((k) => {
    const cat = CATEGORIES[k];
    const est = porCat[k] || 0;
    const lim = orcCat[k] || 0;
    if (est === 0 && lim === 0) return '';
    let direita, cor = 'var(--sub)', barra = '';
    if (lim > 0) {
      const p = Math.round((est / lim) * 100);
      const estourou = est > lim;
      cor = estourou ? C.clay : 'var(--sub)';
      direita = `${TRIP.currency}${est.toLocaleString('pt-BR')} <span style="color:var(--sub)">de ${TRIP.currency}${lim.toLocaleString('pt-BR')}</span>`;
      barra = `<div class="bar" style="margin-top:5px"><span style="width:${Math.min(p,100)}%;background:${estourou?C.clay:cat.color}"></span></div>`;
    } else {
      direita = `${TRIP.currency}${est.toLocaleString('pt-BR')}`;
    }
    return `<div style="padding:10px 0;border-bottom:1px solid var(--border)">
      <div class="row-between"><span style="font-size:13.5px;font-weight:600">${svg(cat.icon,15,cat.color)} ${cat.label}</span><span style="font-size:13.5px;color:${cor}">${direita}</span></div>
      ${barra}
    </div>`;
  }).join('');

  overlay().innerHTML = `<div class="modal">
    <div class="modal-grab"></div>
    <div class="modal-head"><h3 class="serif">Resumo do roteiro</h3><button id="m-close">${svg('x',20)}</button></div>
    <div style="font-size:13px;color:var(--sub);margin-bottom:14px">Soma dos valores estimados das atividades planejadas.</div>

    <div class="card" style="background:${sobra>=0?'rgba(46,139,139,.08)':'rgba(181,101,74,.10)'};border:none;text-align:center;padding:16px">
      <div style="font-size:12px;color:var(--sub)">Estimado no roteiro</div>
      <div class="saldo-big serif" style="color:${sobra>=0?C.teal:C.clay}">${TRIP.currency}${totalRoteiro.toLocaleString('pt-BR')}</div>
      ${orcTotal>0 ? `<div style="font-size:12.5px;color:var(--sub);margin-top:4px">${sobra>=0?'Dentro do orçamento — sobram':'Passou do orçamento em'} <b style="color:${sobra>=0?C.teal:C.clay}">${TRIP.currency}${Math.abs(sobra).toLocaleString('pt-BR')}</b> <span style="color:var(--sub)">(de ${TRIP.currency}${orcTotal.toLocaleString('pt-BR')})</span></div>` : `<div style="font-size:12.5px;color:var(--sub);margin-top:4px">Defina o orçamento total da viagem para comparar.</div>`}
    </div>

    ${linhasCat ? `<div class="mini-label" style="margin:16px 0 4px">Por categoria</div>${linhasCat}` : `<div class="empty">Nenhuma atividade com valor estimado ainda.</div>`}

    <div style="font-size:11.5px;color:var(--sub);margin-top:14px;line-height:1.5">Este é o custo <b>planejado</b> (estimativas do roteiro), diferente do que já foi <b>gasto de verdade</b> (aba Orçamento).</div>
  </div>`;
  overlay().classList.remove('hidden');
  $('#m-close').onclick = closeModal;
}

// Modal: resumo do custo estimado do roteiro — fim
function openMapaModal(local) {
  const q = encodeURIComponent(local || '');
  const wazeUrl = `https://waze.com/ul?q=${q}&navigate=yes`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${q}`;
  overlay().innerHTML = `<div class="modal">
    <div class="modal-grab"></div>
    <div class="modal-head"><h3 class="serif">Abrir no mapa</h3><button id="m-close">${svg('x',20)}</button></div>
    <div style="font-size:13px;color:var(--sub);margin-bottom:16px">Navegar até <b>${esc(local)}</b></div>
    <a class="map-choice" href="${wazeUrl}" target="_blank" rel="noopener">${svg('navigation',20,'#33ccff')}<span>Abrir no Waze</span>${svg('chevronright',18,'var(--sub)')}</a>
    <a class="map-choice" href="${mapsUrl}" target="_blank" rel="noopener">${svg('mappin',20,'#34a853')}<span>Abrir no Google Maps</span>${svg('chevronright',18,'var(--sub)')}</a>
  </div>`;
  overlay().classList.remove('hidden');
  $('#m-close').onclick = closeModal;
  // Fecha o menu ao escolher uma opção
  document.querySelectorAll('.map-choice').forEach((a) => a.onclick = () => setTimeout(closeModal, 100));
}

// Menu: abrir um local no Waze ou no Google Maps — fim
function openPostModal() {
  let form = { text: '', tags: '', grad: GRADS[0], fotoDataUrl: '', fotoNome: '' };
  function draw() {
    const covers = GRADS.map((g) => `<button class="cover-opt ${form.grad===g?'on':''}" data-grad="${g}" style="background:${g}"></button>`).join('');
    const fotoBloco = form.fotoDataUrl
      ? `<div class="foto-preview"><img src="${form.fotoDataUrl}" alt="prévia"><button class="foto-remove" id="foto-remove">${svg('x',16)} Remover foto</button></div>`
      : `<label class="foto-pick" for="f-foto">${svg('camera',18)} Adicionar foto</label><input type="file" id="f-foto" accept="image/*" style="display:none">`;
    overlay().innerHTML = `<div class="modal">
      <div class="modal-grab"></div>
      <div class="modal-head"><h3 class="serif">Nova publicação</h3><button id="m-close">${svg('x',20)}</button></div>
      <div class="field-label">O que você quer compartilhar?</div><textarea class="field" id="f-text" rows="4" placeholder="Conte um momento da viagem...">${esc(form.text)}</textarea>
      <div class="field-label mt14">Foto (opcional)</div>${fotoBloco}
      <div class="field-label mt14">Tags (separe por espaço)</div><input class="field" id="f-tags" placeholder="Paris RoadTrip Europa" value="${esc(form.tags)}">
      <div class="field-label mt14">Capa ${form.fotoDataUrl?'(usada se não houver foto)':''}</div><div class="cover-picker">${covers}</div>
      <button class="primary-btn" id="m-save" ${form.text.trim()?'':'disabled'}>Publicar</button>
    </div>`;
    overlay().classList.remove('hidden');
    $('#m-close').onclick = closeModal;
    $('#f-text').oninput = (e) => { form.text = e.target.value; $('#m-save').disabled = !form.text.trim(); };
    $('#f-tags').oninput = (e) => { form.tags = e.target.value; };
    document.querySelectorAll('[data-grad]').forEach((b) => b.onclick = () => { form.grad = b.dataset.grad; draw(); });

    const fotoInput = $('#f-foto');
    if (fotoInput) fotoInput.onchange = async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      try {
        form.fotoDataUrl = await comprimirImagem(file);
        form.fotoNome = file.name || ('foto_' + Date.now() + '.jpg');
        draw();
      } catch (err) { console.error('Erro ao processar foto:', err); alert('Não consegui processar essa imagem. Tente outra.'); }
    };
    const fotoRemove = $('#foto-remove');
    if (fotoRemove) fotoRemove.onclick = () => { form.fotoDataUrl = ''; form.fotoNome = ''; draw(); };

    $('#m-save').onclick = async () => {
      if (!form.text.trim()) return;
      const tags = form.tags.split(/[\s,]+/).filter(Boolean).map((t) => t.startsWith('#')?t:'#'+t);
      const btn = $('#m-save');
      const postId = Date.now();
      const temFoto = !!form.fotoDataUrl;

      // Publica o post já (com capa colorida enquanto a foto não chega).
      const post = { id: postId, tripId: TRIP.id, author: meId(), time: 'agora', text: form.text.trim(), grad: form.grad, foto: '', likes: 0, likedBy: [], comments: 0, comentariosTexto: '', comentarios: [], tags, aguardandoFoto: temFoto };
      POSTS.unshift(post);
      SYNC.save('Memorias', post);

      if (temFoto) {
        btn.disabled = true; btn.textContent = 'Enviando foto...';
        await SYNC.uploadFoto(form.fotoDataUrl, form.fotoNome, postId);
        closeModal(); render();
        // Fica checando a planilha até a foto aparecer (o Apps Script grava o link lá)
        esperarFoto(postId);
      } else {
        closeModal(); render();
      }
    };
  }
  draw();
}

// Após enviar uma foto, verifica a planilha algumas vezes até o link aparecer,
// então atualiza o post na tela sozinho (sem o usuário recarregar).
async function esperarFoto(postId, tentativas = 10) {
  for (let i = 0; i < tentativas; i++) {
    await new Promise((r) => setTimeout(r, 3000)); // espera 3s entre tentativas
    let data;
    try { data = await SYNC.jsonp(SYNC.url); } catch (e) { continue; }
    const linha = (data.Memorias || []).find((m) => String(m.id) === String(postId));
    if (linha && linha.foto) {
      // achou o link: atualiza o post na memória e redesenha
      const p = POSTS.find((x) => String(x.id) === String(postId));
      if (p) { p.foto = linha.foto; p.aguardandoFoto = false; }
      if (ALL && ALL.Memorias) {
        const raw = ALL.Memorias.find((m) => String(m.id) === String(postId));
        if (raw) raw.foto = linha.foto;
      }
      render();
      return;
    }
  }
  // Se após as tentativas não achou, a sincronização automática (1 min) resolve depois.
  const p = POSTS.find((x) => String(x.id) === String(postId));
  if (p) { p.aguardandoFoto = false; render(); }
}

// Modal: criar nova viagem
function openTripModal() {
  let form = { nome: '', destino: '', inicio: '', fim: '', orcamento: '', moeda: '€' };
  overlay().innerHTML = `<div class="modal">
    <div class="modal-grab"></div>
    <div class="modal-head"><h3 class="serif">Nova viagem</h3><button id="m-close">${svg('x',20)}</button></div>
    <div class="field-label">Nome da viagem</div><input class="field" id="t-nome" placeholder="Ex.: Mochilão Europa">
    <div class="field-label mt14">Destino</div><input class="field" id="t-destino" placeholder="Ex.: Braga → Paris → Milão">
    <div class="two-col"><div><div class="field-label mt14">Início</div><input class="field" id="t-inicio" type="date"></div><div><div class="field-label mt14">Término</div><input class="field" id="t-fim" type="date"></div></div>
    <div class="two-col"><div><div class="field-label mt14">Orçamento</div><input class="field" id="t-orc" type="number" placeholder="0"></div><div><div class="field-label mt14">Moeda</div><input class="field" id="t-moeda" value="€"></div></div>
    <button class="primary-btn" id="m-save" disabled>Criar viagem</button>
  </div>`;
  overlay().classList.remove('hidden');
  $('#m-close').onclick = closeModal;
  const check = () => { $('#m-save').disabled = !$('#t-nome').value.trim(); };
  $('#t-nome').oninput = check;
  $('#m-save').onclick = async () => {
    const nome = $('#t-nome').value.trim();
    if (!nome) return;
    $('#m-save').textContent = 'Criando...';
    const row = {
      nome,
      destino: $('#t-destino').value.trim(),
      inicio: $('#t-inicio').value,
      fim: $('#t-fim').value,
      orcamento: Number($('#t-orc').value) || 0,
      moeda: $('#t-moeda').value.trim() || '€',
      criadaPor: AUTH.user ? AUTH.user.id : '',
    };
    await SYNC.save('Viagens', row);
    // recarrega para pegar a viagem recém-criada (com o id gerado pelo script)
    await SYNC.load();
    closeModal();
    // abre a viagem mais recente criada por mim com esse nome
    const minha = TRIPS.filter((t) => t.name === nome);
    const nova = minha.length ? minha[minha.length - 1] : null;
    if (nova) {
      // já entra como participante/admin
      await SYNC.save('Participantes', { tripId: nova.id, userId: AUTH.user.id, papel: 'admin', canExpense: true, status: 'ativo' });
      await SYNC.load();
      openTrip(nova.id, true);
    } else {
      current = 'trips'; render();
    }
  };
}

// ============================================================
// Init
// ============================================================
function init() {
  // nav
  document.querySelectorAll('.nav button').forEach((b) => b.onclick = () => { current = b.dataset.nav; window.scrollTo(0,0); render(); });
  // fab
  $('#fab').onclick = () => {
    const a = $('#fab').dataset.action;
    if (a === 'expense') openExpenseModal();
    else if (a === 'activity') openActivityModal();
    else if (a === 'post') openPostModal();
    else if (a === 'trip') openTripModal();
  };
  // overlay click closes
  overlay().onclick = (e) => { if (e.target === overlay()) closeModal(); };
  // dark mode
  $('#toggle-dark').onclick = () => {
    document.body.classList.toggle('dark');
    const dark = document.body.classList.contains('dark');
    $('#toggle-dark').innerHTML = svg(dark ? 'sun' : 'moon', 17);
  };
  $('#toggle-dark').innerHTML = svg('moon',17);
  $('#config-btn').innerHTML = svg('settings',17);
  $('#config-btn').onclick = () => { current = 'sync'; window.scrollTo(0,0); render(); };
  const brandHome = $('#brand-home');
  if (brandHome) brandHome.onclick = () => {
    if (TRIP) { current = 'home'; } else { current = 'trips'; }
    window.scrollTo(0,0); render();
  };

  // Começa a carregar os dados JÁ (em paralelo com a splash), se logado e conectado.
  // Assim, quando a splash sai, as viagens normalmente já chegaram.
  let preload = null;
  if (AUTH.user && SYNC.url) {
    preload = SYNC.load().then((ok) => { if (ok) AUTH.ensureMember(); return ok; });
  }

  // splash → depois decide entre login e app
  const splash = $('#splash');
  setTimeout(() => splash.classList.add('leaving'), 1200);
  setTimeout(() => {
    splash.classList.add('gone');
    try {
      if (AUTH.user) enterApp(preload);
      else showLogin();
    } catch (err) {
      console.error('Falha ao inicializar login:', err);
      forceGuestFallback('Ocorreu um erro ao iniciar o login.');
    }
  }, 2500);
}

// Garante que o usuário nunca fique preso: mostra login com opção de convidado
function forceGuestFallback(msg) {
  const el = $('#login');
  if (el) el.style.display = 'flex';
  const g = $('#login-google');
  if (g) g.innerHTML = '<div class="login-warn">' + (msg || 'Não foi possível carregar o login do Google.') + '</div>';
  const demo = $('#login-demo');
  if (demo) {
    demo.style.display = 'block';
    demo.textContent = 'Entrar como convidado';
    demo.onclick = () => {
      AUTH.user = { id: 'demo', name: 'Convidado', fullName: 'Convidado', email: '', picture: '', initials: 'CO', color: '#1E5AA8' };
      if (!MEMBERS.find((m) => m.id === 'demo')) MEMBERS.unshift({ id: 'demo', name: 'Convidado', initials: 'CO', color: '#1E5AA8', admin: true, canExpense: true });
      enterApp();
    };
  }
}

// Mostra a tela de login (com o botão do Google)
function showLogin() {
  $('.app').style.display = 'none';
  $('.nav').style.display = 'none';
  $('#fab').style.display = 'none';
  const el = $('#login');
  el.style.display = 'flex';

  if (!AUTH.configured()) {
    // Sem Client ID configurado: modo de demonstração
    $('#login-google').innerHTML = '<div class="login-warn">Login do Google ainda não configurado.<br>Veja INSTALACAO.md → “Login Google”.</div>';
    $('#login-demo').style.display = 'block';
    $('#login-demo').onclick = () => {
      AUTH.user = { id: 'demo', name: 'Convidado', fullName: 'Convidado', email: '', picture: '', initials: 'CO', color: '#1E5AA8' };
      if (!MEMBERS.find((m) => m.id === 'demo')) MEMBERS.unshift({ id: 'demo', name: 'Convidado', initials: 'CO', color: '#1E5AA8', admin: true, canExpense: true });
      enterApp();
    };
    return;
  }

  // Carrega a biblioteca do Google e desenha o botão
  let booted = false;
  const boot = () => {
    try {
      booted = true;
      google.accounts.id.initialize({ client_id: GOOGLE_CLIENT_ID, callback: AUTH.handleCredential });
      google.accounts.id.renderButton($('#login-google'), { theme: 'filled_blue', size: 'large', shape: 'pill', text: 'signin_with', locale: 'pt-BR' });
      google.accounts.id.prompt();
    } catch (err) {
      console.error('Falha ao iniciar Google Login:', err);
      forceGuestFallback('Não foi possível iniciar o login do Google. Verifique o Client ID e as origens autorizadas.');
    }
  };
  if (window.google && google.accounts) { boot(); return; }

  const s = document.createElement('script');
  s.src = 'https://accounts.google.com/gsi/client';
  s.async = true; s.defer = true;
  s.onload = boot;
  s.onerror = () => forceGuestFallback('Não foi possível carregar a biblioteca do Google (sem internet ou bloqueada).');
  document.head.appendChild(s);

  // Rede de segurança: se em 6s o Google não carregou, libera o convidado
  setTimeout(() => { if (!booted) forceGuestFallback('O login do Google demorou a responder.'); }, 6000);
}

// Entra no app depois de logado
function enterApp(preload) {
  const login = $('#login');
  login.classList.add('screen-hidden');
  login.style.display = 'none';
  $('.app').style.display = '';
  $('.nav').style.display = '';

  // avatar do usuário no topo
  const u = AUTH.user;
  if (u) {
    const av = u.picture
      ? `<img src="${u.picture}" alt="${esc(u.name)}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`
      : u.initials;
    $('#user-btn').innerHTML = `<div class="avatar" style="width:30px;height:30px;background:${u.color};font-size:11px;overflow:hidden">${av}</div>`;
    $('#user-btn').onclick = () => { current = 'sync'; window.scrollTo(0,0); render(); };
  }

  current = 'trips';
  TRIP = null;
  render();

  // Reusa o carregamento já iniciado durante a splash (ou dispara agora)
  if (SYNC.url) {
    const done = (ok) => {
      if (ok) {
        AUTH.ensureMember();
        const last = localStorage.getItem('stigmes_last_trip');
        if (last && TRIPS.find((t) => String(t.id) === String(last))) openTrip(last, true);
        else render();
      } else {
        render(); // mostra estado vazio/erro em vez de "carregando" infinito
      }
    };
    if (preload) preload.then(done);
    else SYNC.load().then(done);
    SYNC.startAutoSync();  // atualização automática a cada 60s
  }
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    init();
  } catch (err) {
    console.error('Erro fatal na inicialização:', err);
    const splash = document.getElementById('splash');
    if (splash) { splash.classList.add('leaving'); setTimeout(() => splash.classList.add('gone'), 500); }
    forceGuestFallback('Ocorreu um erro ao iniciar o app.');
  }
});
