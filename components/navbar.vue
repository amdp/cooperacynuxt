<template>
  <b-container fluid class="p-0 m-0">
    <!--  dekstop nav -->
    <b-container fluid class="m-0 p-0 nav-container">
      <b-navbar
        toggleable="lg"
        class="navbar d-flex justify-content-start m-0 p-0"
        @mouseleave="navState = null"
      >
        <div
          class="col-6 col-sm-4 col-lg-3 p-0 align-items-start"
          @click="hideNav()"
        >
          <nuxt-link to="/">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 1300 200"
              xml:space="preserve"
            >
              <g>
                <text transform="matrix(1 0 0 1 43 110)">
                  <tspan x="0" y="0" class="logo svgtext">C</tspan>
                  <tspan x="170" y="0" class="logo svgtext">OPERACY</tspan>
                </text>
                <g>
                  <image
                    style="overflow: visible;"
                    width="81"
                    height="81"
                    transform="matrix(1 0 0 1 126 29)"
                    xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIEAAACBCAYAAADnoNlQAAAACXBIWXMAAAsSAAALEgHS3X78AAAA
                GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAGR5JREFUeNrsXQuMXNV5PufOWpFS
                qRmZVqhNG4YM5WEeHpNAaIni2UIkSBp5V0mTJlR4NlHS1Bh2FwyYmLA7cXgEkuwuJmkeojumbRS1
                SB6rjUqbEo9LSwgkeEzAtQhTTyhRSsDLRKqiyDP3nv7n3Nd53ntnd2Zndn2PdHyfMzu+3/d//+Pc
                ey5G67iR+64qINTJItz2lh3Y29kK23SJDMsWnHcUIZt+Qw0hB/ajOp5CrfV6nfC6APvu67IAVgHA
                KyLU3gxg5gDMggs6AOuCzy3b0v62tJ8SgJEAeSTwG5AC1aEfpetAjGZKgkECv/eGIoBW9Cy7KIIp
                gWs6FoDOk8D2zrFdAlAimK9SixEDo8PIQlV849okxZoiAfnc7jEAaxuANObJPAdsG6mWL5OgrSFB
                R0OGjkcAqgIk/odZQa9D388I8am1Q4ihJwEp30P9+XboYwBOzizjJss3EaUtEWOFJMgIZOAJUcHb
                hzueGFoSkNm5EkjypN63t5NZurKfP37KQAIpJogjAVbAl0nRosoA22X80eFUh6EjAZn5GoDfmQEQ
                cvqALkoF2gbX0Nacf0pyAzolSEiCjAQ+1ioD8siwgD/EAsyUBAr4d1VmAQCwfDsbBGbMIiMCO9SO
                IEHcfgMJ/O8P3EHieEAlg1khaDBZxmPDQYaBk4B89tsQ5NlzoeXz0XnHI0JcHNBOQALNNiWCQoI2
                lxkkIEEU8FHbrhupQC/j9w/WTQyMBOTOgxDk2YsATDGw+MDyOSIILoED2QSwVuKj3MGp5ZMAJwA7
                YyRAGDNgtAB9Hl8zmADSGggB9nxnDhF8Aq5GUbgqRNZOHO6Tl+wzWFqn58tL/ngc/wm3JPEmwn8t
                1nRLc458LkLg/tAMnHuE/BsqDgKPkVUF/zPfhXTPWWTVPf9CU2ujQGF/2+L2eesa81HNChs6Muzz
                /hzWEaBLLU3SrdhzwB2iQ+R7oAh/jKbXpRKQOw5NwZ87Av/bgmj5GVEriU4z5XWdlcd0YrJ6lMzq
                48DvhhDRZJkih0EVnkCFdaME5I7/oHX9A9CLIfj0ovPrvuU7opWzY1aoClTi+W2eTMF+nFD+8coj
                oqTgR3gvg0IUoB8h/4km8JUQPK5lJSC7nyyEvp/z04r/lyIrYhmk34pwCZq4QKsIJuRJd64gjgBW
                F8fM24vk+2hxzSoBuf0pSP3IIgt8fAsW/DDhCOFwlkw8UvjxAnatW1YBWR10V9T/rPsHa96yDstf
                iseDX/0W6H68UkxUKVwJGZKdVyI/YMowii/vT/Yw0h8CPA3+n8ypZmNxVmd5PPCDQQ98wT3wSuEY
                rJ/LIlzA4UJhCvhRd5mp492PLfvikXkWsVP/vBk6Xc+tOA5AXROhwILGH6Jx/M7e1xR6Xidwbvvh
                IsakFKZZDpdyES7/5nNxR6wTBLUBv24g3ROg5PenwLpPHYTtKr7zG/W+urh5ltIVgZfboI9BzyI+
                vuXrApkuvFmEd+N6iynCpag+tCRwbvsRyD8lADVKgsxEsDnwnXDARikW6crFPilOgUW098N2Bd91
                z8AqbuSbQASLEaKkJcJyQpskRCj0jgg9I4F967PU/5dC8KOIwCuArSdCUMPviDV93AaJby/g2duq
                wzQIQx5hikCJMAk9F0uATIQCWLHuxCXC5t4QoSck6Nx6xCWAZ+mYy8Nx4AIIVxByQkXQEqGjs/4K
                HC/j8l820ZA38g+MDLQKmFMAz0S4gu7qXjTOGcWXrJwIKybBqV31OfiSKewNuWJFBXREcPTxgZ4E
                YPmdabx3ex2tsUYOAhksIEPGI0PSLNdKEEy6203oW/BFK8saVkSCX99yFOQfLVLgsU8ArBLBzcIc
                1TUERLB1RACL70zgz3+ohtZwI99hbmKKkYFXArwCEojrdeYaLlw+EZZNgl/d8lwRwD7EfosHvEIE
                zjUIRNDGBzbvFsqwPo/v/sC6uc2b/CukeRZaBBIUYoc+rARDH+KxKt6ExleVBP9383M5+OARADYb
                gG8igkkRBBcRqAFYvzOO73lvHa3TRmpo1osXui8omRTBXZbxBfDdq1U2dhA+AD3rEAata9PcukOX
                3jb7j3tlXEJQRGnXqiCS2bKeCcD+90UACuTbS/X0BLC6JgBtM+Q4pKuroQRvTP94Dix6KvydroVb
                3HqgAMK2rwSECxqDAHEa33flPDqNGvk+KzodggtXWKEC8MsWCxTP666q2JUSvD79/BhAOEUt2gnE
                3LVwx1MAqg4OCWDnFAFzihBQvgWKMH66EYBh9odurk/9eU9Kzu7+LPy72DcleHXqefD/6ITF4gDK
                Hj4WcK3dkmMDTMLfiYkcLLZg3yj+wmV1dJo38iMADkM6uTIV4Nen8blovudKAFa+CBCyOCCwes/y
                fatn+4U4ASvryFUJOsiTEsDH7R1oAi5NJbEKRBPAjQ9+gnI9JcErky+AG0Bjjgc0k3/ZBUjEcDw9
                ICopqAsYte5/R0oAHr8tBiKghEQQydCVW7CSqQCacwLgMSRzodWHRAhVweHiBIkILSDCaOaBS1MC
                6IiwWSIC6qJeoKpBEdRgrCckODH5wiyAl/MDQR7oAGwOcOE44VTBJcL4hi8WUgJEEeFiRoRqojhA
                dgUqIeZWTIKXbjoGMQCeDAjgF3k54HlVsD3wbSK6CFcV8MSbvri5lsKcqE144wLR7sAEfnhOjrwU
                X0CyYtzAjBsMelYtkUGOBfjUkd8Gosy/+UuXVFJsE6rBhSx9HA8KSlHWrwNf3D8JRMguiwTHbzqW
                AwynRNA1ZJBVQd2u/+aXL55Ooe2SCBewIeLpxNaPjQk/JcDUskgA4E06BKnW75GBG+5xl8R3CVjO
                GCZSSJdJhPPZ7ebVSOvHiao9kWqgJcGPb4RYAKGSbOlRqmDzZAhVYPqMuYvSQHBFTEDUiFqJn6RD
                BjXAZjXQksBzA1mT7Me5CC9wrJ05f9F8iuIKOXAuI8DEMqw/OJe4D2BNdkUCAHI7N8SDosjgK4Dt
                kYFzEeUUwh4R4Q9YylhbJvh+z9oNVEpEgmd3HisByDmj5SdQBnAFlbctXJimg713C7GNqOB76s6q
                tdsTkYBIKkASkMEmgiq0YF+qAr3mwDlseLgSBz5CPAEw19m+YruBC5EkeGbnMVoZLHL3/IRLAxls
                VRkWznlwUzOFrS+t3B34SOps/2QkCeggEf8hmQgCGYgwnwdPhjQY7LcaYL3sx4Dvb4/FkWCb+gV6
                UhiCxMqmfZtaKVz9awB8WQewE9zaZ3QF/phO9leNTFFLgqd2HqPFhCJKQACjOoArSGHqb7PyqAmX
                usIDzxMC6YGX+zaTEowRfc0gUhk4UtQK+zalhaHVUAOE95vkPhjN9bodDP0L62MmEmzTgZ6EEB4R
                9qfwrE4byZMaAN0MXYFo8bZg9ZaiBHA890bjTTmFBITgYngDqB74GDJUU3hWrwHwVRF4y2j94ZIn
                RBggMhI8ecN/FYg72uTe/EFw0BMSonrZQ2lAuLokwPsp8LZHADsA34ohQtC3ykpQMLkCnhA8KaTz
                DqawrG57c96uA5BNnc+3Nerg3x/KqUVBIAEAuTWJ7MukQOFD6KkrGEADIKs6FXC0KmDJipF7pfEb
                WZ4EuTifr93vuo76FakrGBQJDutAt2P2cW6BqcGIHxT6IDPb9h8Xk4ghVK/CfbUUjoHFBbWwVoCl
                wSIhpZQMOUCW4l6zajuOZx25GugFhw7XCcEmVTiawjGY9tv5X7fAqutigCi6B9o7ggIIgeNmpgQA
                boHwlu09JkZ0Vg9E4I+5qkHSAtEAWwdZdcCjwOs2b+28OiA15mMxwQhYfkEAlmCt9PvzDcjkeM9X
                LkhJMNC4wPqpGLthJbhH5v0sDLAInWeAqzXzw8REchGO5CKgN1MYBq0EuNbhpN6WSsaOUkcQ97tK
                QHyeqPctYWWFCJuwTEkweCUQYjQdUvpJ/F3DP9o4I2s5SH8voXbIWFICG9LDFIbBtvPzbzAl6HiW
                3QmCQzcg9FXC3y8rA00TR2j5EGtm98ZIeieETiEQ+mUKw3CogVkJiGD5GKloj/BzC5ka1u4gWheS
                toHEBQqGxIyeTIIczQ5iG9Z+C9ubxgTDkSbW/Ehf1+Le4pCIBBHuISXBULgDVQVwJAGESlBzxCGp
                pK8DJYg4Kpuuv42DSIEqQTa9jGs+JsjihM4cBwFiuIdVDBWB6C5CSNvgs4OCb+V4GciNsImkQA1I
                hJAQs9DQYKSWwjAsMQEWYgGslIf0xAASoDoxRJYkJtok6fUfmhQRcZ6eKJTgKwUiAa7Jv1wLsgOS
                gACE+7QnPG9JIRhsqzbOLtgakBO8FVJIEQ8LSoD13kU/MrV6b/FMm9EVZLHG8vWugP83RHjEwThW
                BYiJCDj5rJlp619QiKWBPX7dNNONrAT1JKCHrxsWRqZSEgy4OQif5UcCWEr9TO6BIwgbAKSjiC1h
                BBHTjtUu3LYc9q9/+kQxhWKg7qBgRzx2pn8qKZiZtuWmiBg1CcKJXQCRlIG4d6ymaeKAGgmeGcGx
                bkCz7zBTgo9/7e1Nqgba+YkEdUAmZdicQjGY9kjjvBy9M0x9IFWacFxQA2E/UwLL9SuoHgl6IDOa
                CaswSt3B4FSgyN8GaJqTIOIx9XpIAowOy6A7Eug8QWyeJAjn5nb8NE0VB0ICvFU/T4FMCJEYvmu/
                Lv9ijVMC9yEGJwHotiItqRoMUAnGpNnJIlVAIkVwa6D/GFpddQVI8v1YvffQP88wNVra+tcebpw/
                5nhjPvEqoCVFTSDBzr/KtQDMug50szLwqoAK9+x8Oa0ZrG5quE3GyPwMqZYURwUSeC6hrnvuQA4U
                bYkgtn8cLe+dfGlbLgnQmBuci5iQCEJIpKgpJIATDgZfonEJfAxgcBmTKTSr0/Y1LirZyMrawcMm
                4aTitkbBNc+Q1kv5402FBDd/9awqgNryfLzeJQQxAFIUAfbnZm78nzRAXBUVsCZt7mkjW3jyCEW6
                dI8EwvxSws1p8KFqTACofjl3DH7ITApRf9sDjS1FOmhkcw+ZqE8jawtDPBGqRhL4LkFMC5GWVcQ/
                h68pQKp4x02vpAFifwPCSVt49lB8LN3hnjRS6z1ugegTnCtQSLD7K29zXYKGQUqswP0Bm3MTTqoG
                fWufb1yRc1AGAsIM0s1J4CgTV1m6Wctq8vcq9yr7LoFIVs+BHKqCfn9p1+TP0tigDw3AnLHRCKIk
                cDgiOEZVwMoS+kIsCQD8Bd7qiQ583/oNpLBxqga9bnc1ihALjJRCAtDuEqLD1kXwdQSgE13tyB9r
                xpLgrod+vw5A1uTpUZXUMCCA5CJYyoiKN03/PK0b9DQWyMw4HgHkThjIGWEqGodTBW52U+3c04bX
                3+AFfQagiTb9/WzwyS8esfW5HTf/PH2wpQft9sa1UwByUVYBR9jOBG7C8ZRBIkVzKv9cLTEJ9u77
                PTplalMEH4lpRjDnPg4IEI5EMjLknNQtrLjd0hjLAeAzPOg8+Pp9VhAzOEHGgI1vozG/FxGjcphX
                6lxCIP1e3OBu++vEPTb1yV2vpkHiitzAyKKDRrIO8/8jWuAdIxl8QlgtGvCb/kbkM2W33/SzE/5E
                l8FbNjA3KsXtC9QBicQgbhXy7MX7z0wnvOyy7WxcNws2PGNFhH2WdzeBOPQXzn9uucuJPfmnK10r
                gRsboAVN0IeM+xCWjrF1OjHWoRTS7tqnGx8v+m7AdQVuD93CCBcPWIELcAQFYMtmFAFiSfDAg2+d
                d1hsgNVCkbSPcNv+OvHcBiwLf777F3MptMnaJxo7IA7YcMARAA/JYAcEGEGOECtYuqwh9j3VVtwJ
                AOiE4g5w6A4i1cBzHR4xpj76mddKKcTR7frGLVlKAAA466rABi7y52MCngByrGD5BKjN5p+orpgE
                c/O/WwMQqyZ3QHjAg8AwjBP4jAH64of3vJ4SwdA+1thDA8BD0AsuwBs4sHmLl9WAWn14DgnJkOj9
                lFaSkwDQaeKPKWjcAfGtH4VkkNwBf97iBz+bEkFuH27slQjAu4INniKoZAizgRE5M6jenX+81jMS
                7Pvy79CawQLhfb8k/8QvEkkFpEAZEE8MNLdt5mR6h7LXxhsPUOn3CCDLvRgYyqpABDIESgAGa00k
                /ftdTTvyF7v+9wibTNmzaoLD0UV/W0gV+YISCgeiPCK1YHv6H2fOqJzOBPhAY18WUr9DFuoULDYK
                0PampOwEU1Lyc5WH6WKHGxkg8kjB6Jfy1VrS32B184MB8AnXLYhqIBIASwSgnXAECJZZ6hqu3Xty
                6nQlwLWNbxZcF5ApiFY9oli3rajCBsUleH2+GwJ0rQQsfbn11RIAuKgWibjUUCgr6wJIT0GsYFn5
                lz1nTJxOBLi68bdFsPoDYNGgBG02FigqQFtSAUdRBM3Acf2h/Le2dPtbrG4/8PADZ1YA+IojEcDR
                EIDPIIj0fl+HX2JUuvrek4euum8pdzoQYLTx6CxY/SG3HCz7/w3ITw3D7GCDoAxEGyswFViWIS17
                KrLrd/+CxQeOFB/wsk84AjiSMjia/cTCLZJB09/btXFdxglXNh7LgYUvgjUXLc73ZySrV3sYG2Bk
                a5fQJ76ef3hZ181a7n8IAB8H628RydKTEEBRBpcA0FGWupri3NKBrQvrSxXe1Tg0BYJ+hA4J+3k9
                UeIAeSBIVysQu6cK5eUSYEVKwIobd7w2BqAdUOKACGLICuBnC4TGB2JvQS8/sXPj/FoG/9LG09Tq
                5/zo3+1tjaXzytAR3mDEK4QmHqhU8vMriqdWPDPlR/a8VgICLPqpoBIUYl3KiIRiEuLBxwoZmk4G
                lZ/81NpyEZc0ns9h1JkB4Eoi4CoBsMYtYMU92LrAsPo3+fvHV/pbezI96Z/eCUTAeJFoAkN+vMFR
                9gduIIoEARkgXig/NTHcZNjU+AmA7wTgY8WSfUuP8v0ySWxdzaAO66N/l7+3NRQkoI2WglnqqAOa
                KyNzGUFIAAl4NhVORiQFTSdZBJMBMlhoAdYrP/jYxqG5R+G8xstFAGYS/qdjfEEHSwBjY/AXHsso
                n7Pl95oAATqj386Xe/L/7+lExeMzrwc1BL5aKFQSNXEAMlm/TwbvOPLWUSb4XAX6wac/snEgr+k9
                p/EqBK+kBMBvB5By/O2dWHoJjSrlbY2fF2MEfVxg1+H7Rh/N7+mZAfR8tupts6+XHKzGCGI84MUB
                ONoNIE8BfOB9siDuuPc/aMGyCv0wnFt75oMbm/0C/u2Nk0X469vgfwZLp+DfZ2VJL6INS7gdZcnH
                AfrATxcPsGMVWJ8+kN/VUwXsy5Tlf/K518dYjIBYyicFiAY3gJEYIErHBeA5BeE7CafpouMSdTiP
                kqIOatJ69v0ba11b+rGlInwHHSvZTG+Moev05aGIe8o/XIo3eouPiqruQLV+MSDEwdMEwbHKP+Vv
                6EtVtW/z1r9v70l68Q5AzwnuwMKhvEcpAQ6VAEkk0BEgIIE/La+OVG5npGDrftwhLgusXpERf2Pw
                /ZYIPuLu59O/jdDRgo8jCaCoQfmf85+c7RdWfX15wTV3n6TTqVAiFPk4IABfFxBqlCCWBEgigT/7
                qo4EGc16xnw8BJ//fsegBo7kFhxNhU8PNNbWAjotWJ/+bv76vmZEq/IGi/fee3IR4oCSDnyTGiCJ
                BAHwJiVAEgkwUuOOGMB168jSkYAYSYC1j4Y6nEuwNaogl4Y7XgZgjz+e/7Nmv/FZtdeYXPWFpTGW
                OYDUxpLBpAL8PmSMB4JtnkAER4DuW73pGBbdgpkExDiprB58Nf3zCDD/7/lt06uFjbVaf+jx2zfS
                6P1sGsUTSbqRNI6gAIykfSb6BtP0x9Admz9H5C8gyluCkbwpTgWDuammw068Wz+IdxOoobegj64m
                AVZVCfhWnANVsFgamY1yC0iWY0NAKLgCpLoCFBUXcNva8yRXkMwl6KeXNo0C+mMAoALTT+WvXvUC
                2MDeavWeB5eoW5iDi10SgMd6fyyQQKcUEUGhQLCMOVg0ZBNqhqAhAb9uRc4xrgwJ12BZfib/7tqg
                sBj4q83e/dUlmkIuwhUpKiqgW8cqEZR4QM4MfGvOGMclxJhAR4KY4DBcR9rJ5TVq0IRl+Uj+nQMf
                Cxma99v90TeWKAlm4BcVBeBjMgJtfUCTGZgAVo5lIkjA/R6fBOEk8zqXoH3bQAuCwIXn8hfPDsu1
                H7qXHF7x10tj8KsmfWVQ0kKUIB7A+owDJSGB4bhChBiXoCEBWL6zAL3yQv78oXo4d2jfdHnFI8xN
                zAAAY35aqXUFpngAS+nhMkmATGpgJAGSA8QaBf94/uzqsF7roX/d6bu+tUTHH0oABp1Eu6B1Bag/
                JECGOoFMAo1LaMGyCuCXX8y/tTns13hNvfP28r9n9x1Sd7EdYe+1LzIpkASeFTNIZSXYJymAXDRy
                /zQBsCnwZP9L+TPra+m6rtkXH1/+6BKdD4lWIbd6hCgIZWMD6Ah3SQIc5Q5QDYhwEPbU/jv/W/W1
                ei3XzduvLzuwlCWuu6AB5Vn0nY2EDf2GBSnduISRBCJZ6P0KdfjMYVg26Xrj3I319XLtTotXoG95
                bKmosfIccYmiqoWFah5JWi9esn7ANrX/F2AAQvoAvZmUK8EAAAAASUVORK5CYII="
                  />
                </g>
                <text transform="matrix(1 0 0 1 50 170)" class="lets svgtext">
                  LET’S DO IT TOGETHER
                </text>
              </g>
            </svg>
          </nuxt-link>
        </div>
        <div class="col-6 d-flex flex-column h-100 nav-only-desktop">
          <div class="navbar-menu w-100 text-center">
            <div class="nav" @mouseenter="navState = 'theproject'">
              <div
                class="nav-item"
                :class="{ 'theproject-active': navState == 'theproject' }"
              >
                THE PROJECT
              </div>
            </div>
            <div class="nav" @mouseenter="navState = 'corporate'">
              <div
                class="nav-item"
                :class="{ 'corporate-active': navState == 'corporate' }"
              >
                CORPORATE
              </div>
            </div>
            <div class="nav" @mouseenter="navState = 'science'">
              <div
                class="nav-item"
                :class="{ 'science-active': navState == 'science' }"
              >
                SCIENCE
              </div>
            </div>
          </div>
          <div
            class="navbar-links text-center"
            id="theproject"
            v-if="navState == 'theproject'"
          >
            <nuxt-link class="menu-item" to="/main/aboutyou"
              >ABOUT YOU</nuxt-link
            >
            <nuxt-link class="menu-item" to="/main/aboutus">ABOUT US</nuxt-link>
            <nuxt-link class="menu-item" to="/main/platform"
              >THE PLATFORM</nuxt-link
            >
            <nuxt-link class="menu-item" to="/main/governance"
              >GOVERNANCE</nuxt-link
            >
          </div>
          <div
            class="navbar-links text-center"
            id="corporate"
            v-if="navState == 'corporate'"
          >
            <nuxt-link class="menu-item" to="/main/corporate"
              >CORPORATE WORLD</nuxt-link
            >
            <nuxt-link class="menu-item" to="/main/overview"
              >MEASURING COOPERATION</nuxt-link
            >
            <nuxt-link class="menu-item" to="/main/coopenspace"
              >CO-OPEN SPACE</nuxt-link
            >
            <nuxt-link class="menu-item" to="/main/cohackathon"
              >CO-HACKATHON</nuxt-link
            >
            <nuxt-link class="menu-item" to="/main/workshops"
              >WORKSHOPS</nuxt-link
            >
          </div>
          <div
            class="navbar-links text-center"
            id="science"
            v-if="navState == 'science'"
          >
            <nuxt-link class="menu-item" to="/main/cooperation"
              >COOPERATION</nuxt-link
            >
            <nuxt-link class="menu-item" to="/main/integration"
              >INTEGRATION</nuxt-link
            >
            <nuxt-link class="menu-item" to="/cci">
              COOPERATION CONTEXT INDEX
            </nuxt-link>
            <nuxt-link class="menu-item" to="/main/research"
              >RESEARCH</nuxt-link
            >
            <nuxt-link class="menu-item" to="/news">NEWS</nuxt-link>
          </div>
        </div>
        <div
          class="col-3 d-flex flex-column align-items-end h-100 nav-only-desktop"
        >
          <div class="text-center h-100 d-flex flex-column">
            <nuxt-link
              class="mobile-menu-item"
              id="login-btn"
              v-if="!this.$auth.loggedIn"
              to="/login"
            >
              LOGIN
            </nuxt-link>
            <nuxt-link to="/user" v-else>
              {{ this.$auth.user.name + ' ' + this.$auth.user.surname }}
            </nuxt-link>
            <div class="social-icons">
              <a href="https://www.facebook.com/cooperacy.org/" target="_blank">
                <img src="../assets/icons/facebook.svg" />
              </a>
              <a
                href="https://www.linkedin.com/company/cooperacy/"
                target="_blank"
              >
                <img src="../assets/icons/linkedin.svg" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCbeRtTRYXwsbSPc9JvSMvtQ"
                target="_blank"
              >
                <img src="../assets/icons/youtube.svg" />
              </a>
              <a @click="colormode()" class="finger">
                <img src="../assets/icons/moonbyadriencoquet.svg" />
              </a>
            </div>
          </div>
        </div>

        <!-- MOBILE HAMBURGER BUTTON -->
        <div
          class="col-2 h-100 burger-btn ml-auto text-right mr-2"
          @click="toggleNav"
        >
          <img v-if="!isDropdownVisible" src="../assets/icons/bars.svg" />
          <img v-else src="../assets/icons/times.svg" />
        </div>
      </b-navbar>

      <!-- MOBILE DROPDOWN -->
      <div class="mobile-dropdown text-center pt-2" v-if="isDropdownVisible">
        <div class="mobile-nav-box" @click="navState = 'theproject'">
          <div
            class="nav-item"
            :class="{ 'theproject-active': navState == 'theproject' }"
          >
            THE PROJECT
          </div>
          <div
            class="mt-2 d-flex flex-column"
            v-if="navState == 'theproject'"
            @click="hideNav()"
          >
            <nuxt-link class="mobile-menu-item" to="/main/aboutyou">
              ABOUT YOU
            </nuxt-link>
            <nuxt-link class="mobile-menu-item" to="/main/aboutus"
              >ABOUT US</nuxt-link
            >
            <nuxt-link class="mobile-menu-item" to="/main/platform">
              THE PLATFORM
            </nuxt-link>
            <nuxt-link class="mobile-menu-item" to="/main/governance">
              GOVERNANCE
            </nuxt-link>
          </div>
        </div>
        <div class="mobile-nav-box" @click="navState = 'corporate'">
          <div
            class="nav-item"
            :class="{ 'corporate-active': navState == 'corporate' }"
          >
            CORPORATE
          </div>
          <div
            class="mt-2 d-flex flex-column"
            v-if="navState == 'corporate'"
            @click="hideNav()"
          >
            <nuxt-link class="mobile-menu-item" to="/main/corporate">
              CORPORATE WORLD
            </nuxt-link>
            <nuxt-link class="mobile-menu-item" to="/main/overview">
              MEASURING COOPERATION
            </nuxt-link>
            <nuxt-link class="mobile-menu-item" to="/main/coopenspace">
              CO-OPEN SPACE
            </nuxt-link>
            <nuxt-link class="mobile-menu-item" to="/main/cohackathon">
              CO-HACKATHON
            </nuxt-link>
            <nuxt-link class="mobile-menu-item" to="/main/workshops">
              WORKSHOPS
            </nuxt-link>
          </div>
        </div>
        <div class="mobile-nav-box" @click="navState = 'science'">
          <div
            class="nav-item"
            :class="{ 'science-active': navState == 'science' }"
          >
            SCIENCE
          </div>
          <div
            class="mt-2 d-flex flex-column"
            v-if="navState == 'science'"
            @click="hideNav()"
          >
            <nuxt-link class="mobile-menu-item" to="/main/cooperation">
              COOPERATION
            </nuxt-link>
            <nuxt-link class="mobile-menu-item" to="/main/integration">
              INTEGRATION
            </nuxt-link>
            <nuxt-link class="mobile-menu-item" to="/cci">
              COOPERATION CONTEXT INDEX
            </nuxt-link>
            <nuxt-link class="mobile-menu-item" to="/main/research"
              >RESEARCH</nuxt-link
            >
            <nuxt-link class="mobile-menu-item" to="/news">NEWS</nuxt-link>
          </div>
        </div>
        <nuxt-link to="/login" v-if="!this.$auth.loggedIn" @click="hideNav()">
          <div class="mobile-nav-box">
            <p class="nav-item">LOGIN</p>
          </div>
        </nuxt-link>
        <nuxt-link to="/user" @click="hideNav()" v-else>
          <div class="mobile-nav-box">
            <p class="nav-item">
              {{ this.$auth.user.name + ' ' + this.$auth.user.surname }}
            </p>
          </div>
        </nuxt-link>
      </div>
      <b-col v-if="this.$auth.loggedIn" cols="12" class="p-0 fluid">
        <votebar :voteprop="$auth.user" :proptype="'user'" />
      </b-col>
    </b-container>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      navState: null,
      isDropdownVisible: false,
    }
  },
  computed: {
    wordLogo() {
      try {
        return require('../assets/image/main/wordlogo.svg')
      } catch (e) {
        return 'not found'
      }
    },
  },
  methods: {
    resetNavState: function () {
      this.navState = null
    },
    hideNav: function () {
      this.isDropdownVisible = false
      this.resetNavState()
    },
    toggleNav: function () {
      this.isDropdownVisible = !this.isDropdownVisible
      this.resetNavState()
    },
    colormode: function () {
      if (this.$colorMode.preference == 'light') {
        this.$colorMode.preference = 'dark'
      } else {
        this.$colorMode.preference = 'light'
      }
    },
  },
}
</script>
