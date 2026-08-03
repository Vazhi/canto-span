from __future__ import annotations
from .common import *
def validate_global(packages: list[dict[str, Any]]) -> dict[str, int]:
    refs = {(p["manifest"]["package_id"], rid) for p in packages for rid in p["ids"]}

    lineage_owner: dict[str, str] = {}
    lineage_parents: dict[str, list[str]] = {}
    for package in packages:
        lineage = package["lineage"]
        lineage_id = lineage["lineage_id"]
        req(lineage_id not in lineage_owner, f"duplicate lineage_id {lineage_id}")
        lineage_owner[lineage_id] = package["manifest"]["package_id"]
        lineage_parents[lineage_id] = lineage["parent_lineage_ids"]
    for parents in lineage_parents.values():
        for parent in parents:
            req(parent.startswith("external:") or parent in lineage_owner, f"unknown parent lineage {parent}")
    visiting: set[str] = set()
    visited: set[str] = set()
    def visit_lineage(node: str) -> None:
        if node in visited:
            return
        req(node not in visiting, f"lineage cycle at {node}")
        visiting.add(node)
        for parent in lineage_parents.get(node, []):
            if not parent.startswith("external:"):
                visit_lineage(parent)
        visiting.remove(node)
        visited.add(node)
    for node in lineage_owner:
        visit_lineage(node)

    edge_ids: set[str] = set()
    outgoing: dict[tuple[str, str], tuple[str, str]] = {}
    duplicate_count = 0
    for package in packages:
        for index, edge in enumerate(package["duplicates"]):
            label = f"duplicate[{package['manifest']['package_id']}:{index}]"
            exact_keys(edge, {"edge_id", "source", "target", "relation"}, label)
            edge_id = edge["edge_id"]
            req(isinstance(edge_id, str) and edge_id and edge_id not in edge_ids, f"duplicate edge_id {edge_id}")
            edge_ids.add(edge_id)
            source = ref_key(edge["source"], f"{label}.source")
            target = ref_key(edge["target"], f"{label}.target")
            req(source in refs and target in refs, f"{label} has missing source or target")
            req(source != target, f"{label} cannot target itself")
            req(edge["relation"] in {"exact", "normalized"}, f"{label}.relation invalid")
            req(source not in outgoing, f"record has multiple duplicate owners: {source}")
            outgoing[\ЫЭ\ЩWHH\™Щ]€\XШ]WШЫЭ[ќ
ПHB€›Ь€ЫЭ\ЩH[€Э]ЫЪ[™О‚€ЩY[Ћ€Щ]Э\VЬЭ‹Э—WHHЩ]

B€›ЩHHЫЭ\ЩB€Ъ[H›ЩH[€Э]ЫЪ[™О‚€™\J›ЩH›Э[€ЩY[‹€™\XШ]HЬ\ЮXЫH]Ы›Щ_HЉB€ЩY[‹Y
›ЩJB€›ЩHHЭ]ЫЪ[™ЦЫ›ЩWB‚€›Э]WЪYО€Щ]ЬЭ—HHЩ]

B€›Э]WШЫЭ[ќH€›Ь€XЪШYЩH[€XЪШYЩ\О‚€›Ь€[™^›Э]H[€[ќ[Y\]JXЪШYЩVИњ›Э]\И—JN‚€X™[H€њ›Э]VЮЬXЪШYЩVЙЫX[љY™\Э	ЧVЙЬXЪШYЩWЪY	Ч_NћЪ[™^WH‚€^XЭЪЩ^\К›Э]KИњ›Э]WЪY‹њЫЭ\ЩH‹›ЭЫ™\—Ъ\ЬЭYH‹њЭ]\И‹њ™\]Z\™[Y[ќИ‹њ›Ъ™XЭYЬ™XЫЬ™ЪYИџKX™[
B€›Э]WЪYH›Э]VИњ›Э]WЪY—B€™\J\Ъ[њЭ[ЩJ›Э]WЪYЭЉH[™›Э]WЪY[™›Э]WЪY›Э[€›Э]WЪYЛ€™\XШ]H›Э]WЪYЬ›Э]WЪYHЉB€›Э]WЪYЛY
›Э]WЪY
B€ЫЭ\ЩHH™Y—ЪЩ^J›Э]VИњЫЭ\ЩH—K€ћЫX™[KњЫЭ\ЩHЉB€™\JЫЭ\ЩH[€™YњЛ€ћЫX™[HЫЭ\ЩHZ\ЬЪ[™ИЉB€™\J\Ъ[њЭ[ЩJ›Э]VИ›ЭЫ™\—Ъ\ЬЭYH—K[ќ
H[™›Э]VИ›ЭЫ™\—Ъ\ЬЭYH—H€€ћЫX™[K›ЭЫ™\—Ъ\ЬЭYH[ќ[YЉB€™\J›Э]VИњЭ]\И—H[€И›Ь[€‹ЫЫ\]Y‹Ш[Щ[Y‹њЭXњЭ[YYџK€ћЫX™[KњЭ]\И[ќ[YЉB€™\J\Ъ[њЭ[ЩJ›Э]VИњ™\]Z\™[Y[ќИ—K\Э
H[™[
\Ъ[њЭ[ЩJ‹ЭЉH[™€›Ь€€[€›Э]VИњ™\]Z\™[Y[ќИ—JK€ћЫX™[Kњ™\]Z\™[Y[ќИ[ќ[YЉB€™\J›Э]VИњ›Ъ™XЭYЬ™XЫЬ™ЪYИ—HOHЬЫЭ\ЩVМWWK€ћЫX™[H]\Э›Ъ™XЭЫЭ\ЩH^XЭHЫЩHЉB€›Э]WШЫЭ[ќ
ПHB‚€\ШЬ™\[ЮWШЫЭ[ќH€[љЧШЫЭ[ќH€›Ь€XЪШYЩH[€XЪШYЩ\О‚€XЪШYЩWЪYHXЪШYЩVИ›X[љY™\Э—VИњXЪШYЩWЪY—B€\ШЬ™\[ЮWЪYО€Щ]ЬЭ—HHЩ]

B€›Ь€[™^[YH[€[ќ[Y\]JXЪШYЩVИ™\ШЬ™\[ЪY\И—JN‚€X™[H€™\ШЬ™\[ЮVЮЬXЪШYЩWЪYNћЪ[™^WH‚€^XЭЪЩ^\К[YKИ™\ШЬ™\[ЮWЪY‹њЫЭ\ЩH‹ќ\H‹њЭ]\И‹њ™\XЩ[Y[ќЭ[YH‹]]Ьљ]WЪ\ЬЭYHџKX™[
B€][WЪYH[YVИ™\ШЬ™\[ЮWЪY—B€™\J\Ъ[њЭ[ЩJ][WЪYЭЉH[™][WЪY[™][WЪY›Э[€\ШЬ™\[ЮWЪYЛ€™\XШ]H\ШЬ™\[ЮWЪYЪ][WЪYHЉB€\ШЬ™\[ЮWЪYЛY
][WЪY
B€™\J™Y—ЪЩ^J[YVИњЫЭ\ЩH—K€ћЫX™[KњЫЭ\ЩHЉH[€™YњЛ€ћЫX™[HЫЭ\ЩHZ\ЬЪ[™ИЉB€™\J[YVИќ\H—H[€Ињ›Ыќ[ЪX][Ы€‹ќ[њЫ][Ы€‹™ЫЬЬИ‹›ЬќЩЬ\H‹њЫЭ\ЩWЪY‹њЩYЫY[ќ][Ы€‹›]\[™\ЬИ‹›Э\€џK€ћЫX™[Kќ\H[ќ[YЉB€™\J[YVИњЭ]\И—H[€И›Ь[€‹њ›ЬЬЩY‹XШЩ\Y‹њ™Z™XЭYџK€ћЫX™[KњЭ]\И[ќ[YЉB€Y€[YVИњЭ]\И—HOHXШЩ\YЋ‚€™\J[YVИњ™\XЩ[Y[ќЭ[YH—H\И›Э›Ы™K€ћЫX™[HXШЩ\Y™\XЩ[Y[ќZ\ЬЪ[™И[YHЉB€™\J\Ъ[њЭ[ЩJ[YVИ]]Ьљ]WЪ\ЬЭYH—K[ќ
H[™[YVИ]]Ьљ]WЪ\ЬЭYH—H€€ћЫX™[HXШЩ\Y™\XЩ[Y[ќZ\ЬЪ[™И]]Ьљ]HЉB€™\J[YVИ]]Ьљ]WЪ\ЬЭYH—HOHXЪШYЩVИ]]Ьљ]WЪ\ЬЭYH—K€ћЫX™[H]]Ьљ]H\ЬЭYHЩ\И›ЭX]ЪXЪШYЩH™]љY]И]]Ьљ]HЉB€™\J[YVИќ\H—H[€XЪШYЩVИњ™\XЩ[Y[ќЬљYЪИ—K€ћЫX™[H\H\И›ЭЫЭ™\™YћH™\XЩ[Y[ќљYЪИЉB€[ЩN‚€™\J[YVИ]]Ьљ]WЪ\ЬЭYH—H\И›Ы™K€ћЫX™[H›Ы‹XXШЩ\Y™\XЩ[Y[ќЫZ[\И]]Ьљ]HЉB€\ШЬ™\[ЮWШЫЭ[ќ
ПHB‚€[љЧЪYО€Щ]ЬЭ—HHЩ]

B€›Ь€[™^[YH[€[ќ[Y\]JXЪШYЩVИ›[љЬИ—JN‚€X™[H€›[љЦЮЬXЪШYЩWЪYNћЪ[™^WH‚€^XЭЪЩ^\К[YKИ›[љЧЪY‹њЫЭ\ЩH‹ќ\H‹ќ\™Щ]‹]]Ьљ]HџKX™[
B€[љЧЪYH[YVИ›[љЧЪY—B€™\J\Ъ[њЭ[ЩJ[љЧЪYЭЉH[™[љЧЪY[™[љЧЪY›Э[€[љЧЪYЛ€™\XШ]H[љЧЪYЫ[љЧЪYHЉB€[љЧЪYЛY
[љЧЪY
B€™\J™Y—ЪЩ^J[YVИњЫЭ\ЩH—K€ћЫX™[KњЫЭ\ЩHЉH[€™YњЛ€ћЫX™[HЫЭ\ЩHZ\ЬЪ[™ИЉB€™\J[YVИќ\H—H[€S’ЧРUUФ’UK€ћЫX™[Kќ\H[ќ[YЉB€™\J\Ъ[њЭ[ЩJ[YVИќ\™Щ]—KЭЉH[™[YVИќ\™Щ]—K€ћЫX™[Kќ\™Щ][ќ[YЉB€™\J[YVИ]]Ьљ]H—HOHS’ЧРUUФ’UVЭ[YVИќ\H—WK€ћЫX™[H\Y]]Ьљ]HZ\ЫX]ЪЉB€[љЧШЫЭ[ќ
ПHB‚€™]\›€В€њXЪШYЩ\ИЋ€[ЉXЪШYЩ\КKњ™XЫЬ™ИЋ€[Љ™YњКK™\XШ]WЩYЩ\ИЋ€\XШ]WШЫЭ[ќ€њ›Э]\ИЋ€›Э]WШЫЭ[ќ™\ШЬ™\[ЪY\ИЋ€\ШЬ™\[ЮWШЫЭ[ќ€љ[\[Y[ќ][Ы—Ы[љЬИЋ€[љЧШЫЭ[ќ›[™XYЩ\ИЋ€[Љ[™XYЩWЫЭЫ™\ЉK€B‚‚™Y€[Y]WЬ›ЫЭШЫЭ™\YЩJ€™\О€]€XЪШYЩWЬ›ЫЭЬ™[€Э‹€XЪШYЩ\О€\ЭЩXЭЬЭ‹[ћWWK€YШXЮWШ\Ъ]™\О€\ЭЩXЭЬЭ‹[ћWWKЉ
HO€›Ы™N‚€XЪШYЩWЬ›ЫЭH™\ЫЫ™J™\ЛXЪШYЩWЬ›ЫЭЬ™[њ™YЪ\ЭћKњXЪШYЩWЬ›ЫЭЉB€™\J€XЪШYЩWЬ›ЫЭ™^\ЭК
H[™XЪШYЩWЬ›ЫЭљ\ЧЩ\Љ
H[™›ЭXЪШYЩWЬ›ЫЭљ\ЧЬЮ[[[љК
K€њXЪШYЩWЬ›ЫЭ]\Э™HH™X[\™XЭЬћH‹€
B‚€XЭ]™WЬ›ЫЭИHЬXЪШYЩVИњ›ЫЭ—Kњ™\ЫЫ™J
H›Ь€XЪШYЩH[€XЪШYЩ\ЧB€\Ъ]™WЬ›ЫЭО€\ЭФ]HHЧB€›Ь€[™^\Ъ]™H[€[ќ[Y\]JYШXЮWШ\Ъ]™\КN‚€›ЫЭH™\ЫЫ™J™\Л\Ъ]™VИњЫЭ\ЩWЬ›ЫЭ—K€›YШXЮWШ\Ъ]™\ЦЮЪ[™^WKњЫЭ\ЩWЬ›ЫЭЉB€™\J›ЫЭ™^\ЭК
H[™›ЫЭљ\ЧЩ\Љ
H[™›Э›ЫЭљ\ЧЬЮ[[[љК
K€›YШXЮH\Ъ]™H›ЫЭ]\Э™HH™X[\™XЭЬћN€Ш\Ъ]™VЙЬЫЭ\ЩWЬ›ЫЭ	Ч_HЉB€ћN‚€™[]]™HH›ЫЭњ™[]]™WЭКXЪШYЩWЬ›ЫЭ
B€^Щ\[YQ\њ›Ь€\И^О‚€Z\ЩHЫЫќXЭ\њ›ЬЉ€›YШXЮH\Ъ]™H›ЫЭЭ]ЪYHЫЫ™љYЭ\™YXЪШYЩWЬ›ЫЭ€Ш\Ъ]™VЙЬЫЭ\ЩWЬ›ЫЭ	Ч_HЉHњ›ЫH^В€™\J™[]]™Kњ\ќЛ›YШXЮH\Ъ]™H›ЫЭШ[››Э\]X[ЫЫ™љYЭ\™YXЪШYЩWЬ›ЫЭЉB€\Ъ]™WЬ›ЫЭЛ\[™
›ЫЭњ™\ЫЫ™J
JB‚€›ЫЭИHXЭ]™WЬ›ЫЭИ
И\Ъ]™WЬ›ЫЭВ€™\J[Љ›ЫЭКHOH[ЉЩ]
›ЫЭКJKXЭ]™H[™YШXЮH›ЫЭИ]\Э™H[љ\]YHЉB€›Ь€[™^Yќ[€[ќ[Y\]J›ЫЭКN‚€›Ь€љYЪ[€›ЫЭЦЪ[™^
ИN—N‚€™\JYќ›Э[€љYЪњ\™[ќИ[™љYЪ›Э[€Yќњ\™[ќЛ™XЫ\™YXЪШYЩH›ЫЭИЭ™\›\ЉB‚€›Ь€Э\њ™[ќ\њЛ[Y\И[€ЬЛќШ[КXЪШYЩWЬ›ЫЭ›ЫЭЫ[љЬПQ[ЩJN‚€Э\њ™[ќЬ]H]
Э\њ™[ќ
B€›Ь€[YH[€\њО‚€™\J›Э
Э\њ™[ќЬ]И[YJKљ\ЧЬЮ[[[љК
KњXЪШYЩWЬ›ЫЭЫЫќZ[њИЮ[[[љИ\™XЭЬћHЉB€›Ь€[YH[€[Y\О‚€]HЭ\њ™[ќЬ]И[YB€™\J›Э]љ\ЧЬЮ[[[љК
KњXЪШYЩWЬ›ЫЭЫЫќZ[њИЮ[[[љИљ[HЉB€™\ЫЫ™YH]њ™\ЫЫ™J
B€™\J€[ћJ›ЫЭOH™\ЫЫ™Yњ\™[ќЬ€›ЫЭ[€™\ЫЫ™Yњ\™[ќИ›Ь€›ЫЭ[€›ЫЭКK€€ќ[™XЫ\™YXЪШYЩHљ[N€Ь]њ™[]]™WЭК™\К_H‹€
B