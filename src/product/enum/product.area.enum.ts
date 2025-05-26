export enum AREA {
    EUROPE = "EUROPE",
    SOUTHEAST_ASIA = "SOUTHEAST_ASIA",
    GREATER_CHINA = "GREATER_CHINA",
    JAPAN = "JAPAN",
    GUAM_SAIPAN = "GUAM_SAIPAN",
    AUSTRALIA_NEWZEALAND = "AUSTRALIA_NEWZEALAND",
    AMERICAS_HAWAII_CANADA = "AMERICAS_HAWAII_CANADA",
}

export namespace AREA {
    export const detailMap: Record<AREA, string[]> = {
        [AREA.EUROPE]: ['서유럽', '동유럽'],
        [AREA.SOUTHEAST_ASIA]: ['태국', '베트남', '싱가포르'],
        [AREA.GREATER_CHINA]: ['홍콩', '대만', '중국'],
        [AREA.JAPAN]: ['오사카', '도쿄', '후쿠오카', '오키나와'],
        [AREA.GUAM_SAIPAN]: ['괌', '사이판'],
        [AREA.AUSTRALIA_NEWZEALAND]: ['호주', '뉴질랜드'],
        [AREA.AMERICAS_HAWAII_CANADA]: ['미동부', '미서부', '하와이', '캐나다'],
    }
}

//console.log(AREA.detailMap[AREA.WEST_EUROPE]); // ['프랑스', '이탈리아', '독일']