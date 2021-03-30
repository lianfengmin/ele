<template>
  <div class="login_container flex">
    <div class="login_box">
      <div class="avatar_box">
        <img
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAH1AfQBAREA/8QAHAABAAIDAQEBAAAAAAAAAAAAAAcIBAUGAwEC/8QAVRAAAgEDAgIECAcKCwcCBwAAAAECAwQFBhEHIRIxQVETF2FxgZGh0ggUIjJWk7E3QlJicpKUosHRFRgjM0NTVFWCsrMWJDRzdHXCJWNERYOEo+Hx/9oACAEBAAA/AJ2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPkpKMXKTSilu23ySOF1Dxf0dp6U6U8j8euY8nRsl4Tn5ZfNXrI3y/wjbyblHDYKjRj97Uu6jm/zY7L2nJ3fHLXVzNunkaFsvwaFtBL9ZNmtlxb15J7/wC0l16IwX/ie1DjJr2h/wDP6lRf+5Rpy/8AE3+O+EHqq2lFXtrj72CWz3pOnJ+mL/Yd5g/hCadvZRp5ewu8dN9dSP8ALU16tpL1Mk/D57E6gtfjOJyFveUu10ZpuPnXWvSbEAAAAAAAAAAAAAAAAAAAAAAAAAA4DXXFrBaMc7SL/hDKpf8AC0Zcqb/9yX3vm5srtqziTqXWFScb++lStG/k2lu3Ckl5V1y9O5yO59UW2kk231JG5sdIakyUelZYHJV4/hQtptevY3NPhNrurDpR03d7fjOEX6mzFueG2s7Rvwumsly63Ci5r1x3OeurC7sZ9C7ta1vP8GrTcH7Tw6jJx+SvsVdwu8fd17W4h1VKM3GS9KJp0Vx+uKEqdlqyi69PqV/QjtOP5cFyl51s/IyecdkrLL2FK+x91SurWqt4VaUt4v8A/fkMoAAAAAAAAAAAAAAAAAAAAAAAANpJttJLr3IC4n8apudbB6TuOjFbwuMjB833xpPu/G9XeQROcqk5TnJylJ7tt7ts2OD0/ldR38bHEWNa7uH1xprlFd8n1JeVk3aW+DzQhCFxqjISqT63aWb2ivJKb6/QvSSxhdGab09TUcXhbO3aW3hPBqU355S3ftN7u+9gHhd2Vrf0nSvLajcU2tnGtTU17SPtRcEtIZyM6lrbTxVy+qpaP5G/lg+Xq2IS1jwg1JpKM7mNJZHHR5/GbWLbgvx4dcfPzXlI+Op0XrzM6IyKuMfV6dtNrw9pUb8HVXm7H3Ncy1ukNY4rWuHjkMZV+VHaNe3m/wCUoy7pLu7n1M6AAAAAAAAAAAAAAAAAAAAAAAAFfuM/FKVWrX0rgq7VKLcL+5pv577aUX3Ltfb1d+8Fki8OOFOQ1tVje3TnZ4WEtpXG3yqzXXGmn7ZdS8pZzA6dxWmcbDH4iyp21CPX0VvKb75S65Pzm0ByGpuJmltJXjsslfyd4knK3t6bqTjv1dLbkvM2e+luIOm9Y1KlHEXzlc049OVvVpunUUe9J9a8x1AAIk4icFbDUEKuT09TpWOU5ylQXyaNw/N95Ly9T7e8rbf2N1jL6tZXtvUt7mhNwqUqi2lF9zNppPVeS0dnaOUxtTaUXtVpN/IrQ7Yy8n2dZcDS2psfq7AUMvjpt0qnKdOXzqU11wl5V7Vz7TcgAAAAAAAAAAAAAAAAAAAAAAjbjFr16Q06rKxq9HLZCLhSa66NPqlPz9i8u77Cqbbk2222+19p2+g9J47ISlndUXcbHTdpUUalSe6dzU61ShtzfLm9upE/23Fvh3Z21K2tszRo0KUVCnTp2tVRjFdSS6PI9PHJoH+/4/o9X3R45NA/3/H9Hq+6PHJoH+/4/o9X3Ssus8jb5fWuayFpWda2ubypUpVGmulFvk9nzXI2vC7O2GnNf4/JZO5dtZ041I1KnRctt4NLkk317FhfHJoH+/4/o9X3R45NA/3/AB/R6vujxyaB/v8Aj+j1fdHjk0D/AH/H9Hq+6ZuK4n6MzWQpWFjnKM7mq9qcJwnT6b7k5JLfyGp4o8M7bWuNleWUIUc5bw/kqnUq8V/Rz/Y+x+QqlcW9W1uKlvXpypVqUnCcJrZxkuTTXedzwq15U0XqWCuKkv4JvGqd3DflDuqLyx39W5beMozipwkpRkt1JPdNdjR9AAAAAAAAAAAAAAAAAAAAAB5XFxStLarc3FRU6NKDqVJvqjFLdv1FMNcaor6v1Ze5eq5KnUn0beD/AKOkuUV6ub8rZj6U05d6s1JZ4azW1S4n8qe26pwXOUn5kSxx0wVPT+ndK47HUvB4u18LSS2/pNoveT73zfrIS2flHMcxswBsxzHMcz0o+F8PTVHpeGcl4Po9fS35beXcvLYqssfbK53+MeBh4Xfr6fRXS9u5B3HrQceitX46kk91TyEYrr7I1P2P0EB9paHgZq957ScsRdVele4raCcnznRfzH6OcfUSoAAAAAAAAAAAAAAAAAAAAACMeOmo3hdBSsaUmrjKVPi627Ka5z/YvSVYXWWR+D/pRWGnrjUdxT2uL+TpUG1zjRi+b/xS/wAqJZyOMscvZTssjZ0bu2n86lWgpRfl8/lOb8Vuh/o1Y+qX7x4rdD/Rmx9UveHit0P9GbH1S94eK3Q/0ZsfVL3irWtbK2x2uM5ZWdGNG2oXtWnSpx6oxUuSRtuFWKsM3xEx1hk7WndWlWNXp0qm+z2g2uryosf4rdD/AEZsfVL948Vuh/ozY+qXvDxW6H+jNj6pe8PFbof6M2Pql7xmYzQWlMPewvLDAWNC5hzhVVPdxfet29n5UdGY2QsbfJ465sLumqltc05UqsH2xa2ZSnU+Cr6Z1Jf4e43c7Ws4KT++j1xl6U0zf8J9RPTfELHVpz6NtdS+KV+7oz5J+iXRfoLgAAAAAAAAAAAAAAAAAAAAAArL8IPLu81vbY2Mk6dhaxTXdOb6T9nRIqsrWrfX1vaUIuVWvUjSgl2yk9l9peLEYyjhsNZYygkqVpQhRjt+Ktt/T1mVVq06FGpWqzUKdOLnOT6opLdv1Fecz8IbMyydVYXG2MLGLapu6jKdSa3+c9pJLfuNf/GE1d/YsP8AUT98fxhNXf2LD/UT98fxhNXf2LD/AFE/fI0zGUr5vNXuUuo0417utKtUVNbRUpPd7LuMrTGo7zSeft8zYQozuaCkoxrRbi+kmnuk12MkH+MJq7+xYf6ifvj+MJq7+xYf6ifvj+MJq7+xYf6ifvj+MJq7+xYf6ifvkn8KuJ9bXavLLI2tGhkbWCq70N+hUg3tuk29mnt29pJQK6/CJwSt83jM5Thsrui6FVr8OHNfqv2EKRk4yUotpp7pou7pXLfw7pPE5RveVza06k+X3220vambgAAAAAAAAAAAAAAAAAAAAAptxNvJX/EvUFaT32vJ015ofJXsRkcJcdHJcTsJTnBShTrOvJP8SLkvakXBPG7tqd7Z17Wrv4OvTlTnt17STT+0qrmuDGssZkqtvaYueQtlJ+CuLeUWpx7N02mn5DX+KnXX0avP1f3jxU66+jV5+r+8eKnXX0avP1f3nK3tlc46+r2V5RlRuaE3Tq05dcZLrTPbE4m/zmRp4/GWs7m7q79ClDbd7Ld9fkOk8VOuvo1efq+8PFTrr6NXn6v7x4qddfRq8/V/ePFTrr6NXn6v7yXuC3DrL6Xub3M5ugravXpKhQt3JOcY77ylLbq6kkiYgRfx7x0bzhvO66Kc7O6pVE31pS3g9vzl6irKLY8D7x3fC+xhKXSlb1qtHzLpbr2SJFAAAAAAAAAAAAAAAAAAAAB9Xzo+dFG9RzdTU+WnJ7uV5Wb/AD2d5wEgpcTKba5ws60l59kv2lpwOQ5DkORTLiF90XUX/cK3+Zm74K/dUxP5Nb/TkWx5H3kOQ5AA4ri5SjV4WZ5SXVShJedVIsp92lmvg7zctB38W+UMjJL6uDJcAAAAAAAAAAAAAAAAAAAAB9XWvOikGrLadpq/M281tKne1ov89nacCK8aPE62i3/O21amvP0d/wBhaavWhb29WvU36FKDnLbuS3f2FV8zxr1lkMlVrWOS/g+1cn4KhRpQfRj2btptvY1/jd179I7j6qn7o8buvfpHcfVU/dHjd179I7j6qn7o8buvfpHcfVU/dOSv765yd/Xvrys611cVHUq1GknKT63yPbD5jIYDJ0sji7qVtd0k1CrFJtbrZ9aa6jp/G7r36R3H1VP3R43de/SO4+qp+6PG7r36R3H1VP3R43de/SO4+qp+6bDD8bdaY6/hWvMhHI26a8JQr0oLpLt2lFJp+Us/iMnb5rDWeUtW3b3dGNan0utJrfZ+UzThuMVwrfhXm2/v406a9NSKKhFnfg9UJUuH91Uae1XITkvLtCC/YSyAAAAAAAAAAAAAAAAAAAAAVA4uY947ihm4bNRrVlcR8qnFS+1swOHOUjhuIeCvZvanG7jCb32SjP5Db/OLl16EK9CrQqbuFSEoS27mtmVryPwftUUb+tDH3OPr2ik/BVKlZwk49m625MxfEFrTvxf6U/dHiC1p34v9KfujxBa078X+lP3R4gtad+L/AEp+6R3lsZcYXMXmMuuh8YtKsqNToS3j0ovZ7MydN6evtU52hiMc6Suq6k4eFn0Y/JTb3fmR3fiC1p34v9KfujxBa078X+lP3R4gtad+L/Sn7pz2ruGmotFWNC9ytO2dvWqeCU7et01GWzaT5LrSfqOQLc8H23wqwW73/k6i/wDyzO4Id+EPlXbaSx+MhJJ3l105rtcaa/fJFa0W24K2krThbjHPrrTq1ly7HN7fYSAAAAAAYeQy+NxMYSyOQtbONR7QdxWjT6T8m75mVTqQq041Kc4zhJbxlF7pryNdZ+gAAAAAAAAAAAAAAV3+EXhXRzOKzcI/IuKMrao/xoPdeyXsIThJwmpRe0k90+5l1tF56GptHYvLRkpTr0EqvPqqR+TNetM3wABTPiF90bUf/cK3+Zm64K/dVxP5Nb/TkWyAIe+ERdQp6Oxdq3/KVr/pxXkjCW/+ZFby3XCGDhwqwSfbTqP11JHblW+PGoI5fXrsKUulRxdJUP8A6j+VP7UvQRjRpVK9enRpQc6lSShGKXNtvZIu/p3FRwem8bi47f7pbQpPZ9qXP27mzAAAAAe6W6W77u8pLqjOZLUWoLu/yladWvKpKKjN8qcU3tCK7Eu4kDg3xHlpzKRwWWuGsRdy2pznLlbVH1PyRfU+58+8s0AAAAAAAAAAAAAADi+KmmnqjQF/bUodO6t18at0lzc4JtpeePSRT7qZOHwfdXxtr250td1doXLde06T/pEvlRXnST/wlhQACmfEL7o2o/8AuFb/ADM3XBX7quJ/Jrf6ci2S57Ir1rTjnnLbUt5YYCFrQs7StKj4SrS8JKs4vZvnyS3T2SPzjPhF5SjBRymDtblpc529V0m35nujhOIHEC+19kqFe4t4WttbRlGhQhJy23fNtvrb2XqORUXJqMU3J8kl2suxpPGSwukcPjZ/zltZ06c+W3ylHn7dzy1jqa30jpa9zFdpyow2owb/AJyq+UY+vn5kylt3dVr68rXVxN1K9acqlST++k3u2SHwS0u8/ruleVqfSs8Wlc1G1unPqhH18/8ACWsAAAAABXHjhw+/gm/lqjF0drK7n/vkIrlSqv77yRl9vnIYbfaWb4H68eoMG8BkKvSyOOgvBTk+dah1L0x6n5NiWgAAAAAAAAAAAAAAVM4v6KlpTWFWtbUujjcg3Xt2lyg2/lw9D6vI0cLZ3NewvKN3a1pUrijNVKdSHJxknumi4PDvWdLW+lqWQcVTvKUvA3dNdUaiW+68jXNeo6wAFM+IX3RtR/8AcK3+Zm64K/dVxP5Nb/TkWy6iCddcCLu+y91lNN3VBq5qSqzs7h9Fxk3u+hLqa37HtsRtd8J9c2Ump6duqiXbRlGon+azX1NAawpS6M9MZbd91rN/YiSOGPBzKPN2+Z1NaO0tLWaq0rWrt0601zXSXZFPnz5vYsOVn4+aseV1RSwFvUbtcYv5VJ8pV5Ln+atl6WRFGLlJRSbbeyS7S4XDDR8NHaNtrWpBK/uUri7l+O1yj5orZes7MAAAAAGPf2NrlMfcWF7RjWtrim6dWnLqlF9ZTXXWk6+jNV3eIqtzpRfhLeq1/OUn81+fsflTMTSuobnS2pbHM2rfTtqicob/AD4PlKL863RdWxvKGRsLe+tZ9O3uKUatOXfGS3RkAAAAAAAAAAAAAAGh1hpWy1jpy4xN78np/Ko1kt3SqL5sl+3vTZU7LaE1NhstPG3GGvJ1oy6MJUaMqkKnc4yS2aZYrg7orIaO0zcLKpU7y+qqrKgnv4KKjsk31dLr3JFABTTiIkuI+okv7fV/zGz4PVZUuK2D6P386kH5nTkW4AANZqLNUdO6dyGXr7OFpQlUSf30l81el7IpHe3de+vq93cTc69epKpUk+2Te7Oz4R6bWpOIVhTqw6VraN3dfzQ5pemXRXrLedbAAAAAABE/HnS0ctpCGaoU97rFy3k0ucqMntJeh7P1lYiz3APUUsromri60962LrdCO75+CnvKPqfSXqJXAAAAAAAAAAAAAAA3a7WDzrV6VtQqV69WFKjTi5TqTkoxil1tt9SNDjdeaUzF+rHH5+xr3Le0acamzk/xd9t/QdECmvEb7pGov+vq/aZ3CL7quA/50/8ATkW86yEdb8eKmJzNzi9PWNvcfFpunUurltxlNPZqMU1yT5bt8zj3x/1lvyo4pf8A2794eP8A1l/VYr9HfvDx/wCsv6rF/oz940mquLWpdW4OeJyPxOFrUnGc/AUnFy6L3Sb36t+foOCOr0ZrzLaHnd1MTRs5VLqMYzncU3JpR3ey5rvOt8f+sv6rFfo794eP/WX9Vi/0d+8TDwt4hy17ibp3dvTt8hZzjGtGlv0Jxl82S35rqaaO9AAAAAMbIWNHKY26sLiKlRuaUqM0+6S2/aUcyVjVxuUu7CstqttWnRn54tp/YSbwAy3xHX9SwlNKF/azhs+2cflL2KRZ8AAAAAAAAAAAAAAAERfCEr31LRlhTt5VI2lW86Nz0eqW0W4J+TdP0orZGUoSUoyalF7pp7NMkrTHG/VOAhC3vZU8vaR5KN02qiXkqLn69yTcV8IHS12lHIWt/YT7W4KrD1x5+wgTWuQtctrbNZCyq+Ftbm7nUpVNmulFvk9nzNrwprUrfihgqterClTjVm5TnJRS/k5dbZbShk7C5qeDt761rVNt1GnWjJ+pMo9dc7uu321JfazMwuCymor/AOI4iyq3lz0HPwdPblFdbbfJI6PxSa8+jdx9ZT94eKTXn0bufrKfvGg1DpfN6Yq0KWax9SznWi5U1NxfSSezfJs0p2lrwr1vd2lG5t9P150a0I1Kc/CQXSi1unzl3Ht4o9e/Ryv9bT94+rhFr1tL/Z2uvPVp+8Tjwf4f32icVe18rKCyF9KHSo05dJUoR32Ta5Ntt9RJQAAAAAKhcX7GNhxSzcILaNWrGstu+cVJ+1s1/De8lY8SNP14vb/facG/JJ9F+xsuaAAAAAAAAAAAAAAADBzGIsM9irjG5O3jcWlePRnCXsafY12MgjVnwfr616Vzpi8+OU+t2ly1GqvyZdUvTsRHlcFlsHcOhlcbdWdRPbatScU/M+p+g14BlY28u8dk7W8sKkqV3RqxnSnB7NST5HhVcpVqkpraTk215dyRuCmexWntY3V3l76jZ28rGVOM6raTk5Re3LzMnrxoaH+kth+dL9xusRqTCZ6LeJytnebLdxo1VKSXe49fsIJ+Edv/ALQ4Tu+KT/zkJl58LCNPA46EUto2tJLb8hGecVqjippbSWQlj7+6q1b2GznQtqXTdPf8J8kn5N9zd6a1XhdXY+V5hryNxThLo1ItOM6b7pRfNG6AAAAABVrj7FR4lNpc5WVFvz81+w4DT85U9SYucW043dJpr8tF5X85+dnwAAAAAAAAAAAAAAAA869Cjc0XSuKVOtSfXCpFSi/Qzkcrwp0Vl25V8FQo1G9+nat0X+q9vYVZ1di7fCawy+LtOm7e0up0qfhHvLop8t2fdJafeqdU2GEjcq2d3OUVVcOl0douXV29ROWmuAVph87a5HI5n49StpqrG3jb9BTkua6TbfLfs7SvF027uu321JfazyG/lMiwv7vF39G+sbipb3VGSnTq05bOLRJ3GjJVM9itGZudJQd5jpSn0epT3Ta9bIkReHTNdXOlcRXTTVSyoy3X5CNhc3NOztK11We1KjTlUm+6MVu/Yij+WyNXL5m9yVdt1LqvOtLd77dJtkwfBypVXms7WT/ko21KElv1ycm19jLCgAAAAAqnx1uVccT7umv6C3o0v1el/wCRx2kbV3ussLbJ7OpfUY/rou8+bb8p8AAAAAAAAAAAAAAAAAKa8Rfuj6i/6+r9pncI/uq4D/nT/wBORbt9RRS5/wCLrf8AMl9rJL4GYXHZvV19SyePt72hTsXJQr01OMZdOOz2fb1ndcatH6dxegnf47DWdndUrqnGNS3pKDalumnt1orqS7rTHzu+AOjcjFNq0nKnPbsU+kt/XBesh3tLe8H8pHKcMMRJNdO2jK1mt99nCTS9jT9J58YtQLAcOr5QqdG4vtrSls9n8r5z/NTKllmPg/4h2eh7nJTjtK/upOLa64QXRXt6XqJZAAAAAG2/LvKW6/ysc3r7N38JdKnUu5qm12xj8mPsSNtwfxryXFDDR6PShQqSuJ+RQi2n69i3gAAAAAAAAAAAAAAAAAKa8Rvukai/6+r9p+eH2ZstPa7xWWyE5wtLac51HCHSfOEktl52iZl8IfC1LyVFYm8o27hLo3FSUW1LZ9HeC7G9u3kV1nN1Kkpy65Nyfpe5OPwcbSbvc/eOPyFSpUVLytuW3qR2fHf7mVb/AKuj9rKtFl8ThJag+DdRx8Y9KtKxnVpL8eFSUo/ZsVkfWTt8HXUMYV8pp2rPnUSu6Cb7V8maXo6L9BoeO2qY5rWEMRb1FK1xUXTe3U60tnP1bKPoZGNpbVr28oWlvBzr16kadOK7ZN7Jesuxp3D0tP6cx+JopdG0oRpb97S5v0vdmzAAAAAOb17n46Z0Rlco5JVYUXTo79tSfyY+17+gpdJuUm222+tvtJy+DnhHUyGXzk4fJpU42tKTX30n0pbehL1lgwAAAAAAAAAAAAAAAADjNX8T9NaNcqF5cu5v0v8Ag7baU1+U+qPp5+QqpqPL/wAP6kyWX8D4D45cTreC6XS6G76t+01h96Euh0+i+hvt0tuW/dv3nws5wBxPxLQNW+lHad/dzmn3wh8le3pGRx4klwzqptJu7opeXmyrZcXhhQdvwy09B9btIz/Obl+0rNxO0w9K67yFnCDja1p/GLZ9jpz57LzPdeg5/B5u+07mKGVxtbwV3QbcJbb9aae68zZiVKk6tSVWpOU5zblKUnu231tkv8B9FvK5yepruD+K46fRt01yqVmuvzRT387RZEAAAAAFcuP+sFf5ihpm0qb0LF+FuWnylWa5R/wp+uXkIXSbaSTbZcjhrpl6U0Lj8fUh0LqcfD3Pf4SfNp+ZbL0HWgAAAAAAAAAAAAAAAA5zX2Sv8RoPNZDGJ/HKFs5U5JbuHNJyXmTb9BTOpUnWqzqVJyqVJtylOT3cm+1vtZk4zFZDM3sbPG2de7uZdVOjByfp7l5WTNpD4P8AXqund6quvA0+v4lbS3m/JKfUvMt/OclxcyeLWfpabwNvRtsVh06fQoraM67+fJv75rZR3fczgLa3rXd1RtreDnXrTjTpwXXKTeyXrZN2X4tz0FToaRwGOtq6xNONtWubiTanVivl9GK25dLfm+sj/WXE7P63saNlko2tK2pVPCqnb03HpS2aTbbfUm/WcZs3yS3b5JIu5pmw/gvSuIsHvvb2dKm91z3UFuR3x707Z5HR1PMzrUaN5jppU3Uls6sJvZwXe+qSXkZWI2OCxs81m7LF069KhO6rRpKrWltGG723ZdLT+Cs9NYK0xFhDo29tDoptc5Ptk/K3u2bMAAAAA4ziTru30NpudwpRlk7hOFlRfPeX4bX4Mevz7IqDc3Fa8uatxXqSq1qs3OpOT3cpN7tskbgvoyWptXQvrml0sbjGq1Tdcp1PvIetbvyLylqwAAAAAAAAAAAAAAAAD5OEakJQnFSjJNSjJbpp9jRHtxwT0Nc38rp46tTUm26FK4lGnv5F2LyJnZ4jB4rAWatcTYW9nR7Y0YJdLyt9bfnOW4oa8o6J05PwFSLy93FwtKe/OPY6jXdH2vYqROcqlSVScnKcm5Sk3u231tkt8CNHyy2pJ6huaf8AueMe1Ftcp12uX5qe/naNpxI4MZu81Ld5fTlKnd295UdWdu6ihOnN/O26WycW+fX2nFR4Na+lLb+AWvK7ml7x22iuA+SpZa0yGpK9tSt6FSNV2dKXhJVNuajJ9SW/X1kt6w13hNF2Lr5O5Uria3o2lNp1avmXYvK+RVnWuuctrjK/G8hNU6FPdW9rB/Iox/a+9/8A8OWce0+J9Fposbwk4uQytKhp3UVwo5CKULW7qS2VwuyEn+H3Pt8/XNAAAAAOc1lrTFaJw8r7I1N6sk1b20X/AClaXcu5d76l7Co+qtUZHV+dr5bJVN6lR7Qpx+bSguqMV2Je3rMXB4W+1DmLbFY2i6t1cTUIR7F3tvsSXNsuPo3Stno7TNriLTaTgulWq7c6tR/Ok/sXckjfAAAAAAAAAAAAAAAAAAGi1jqWjpHSt7mq1J1fARSp009unOT2it+xbvmyn2oNQZHU+ar5XKV/C3NZ9i2jCK6oxXYl3GRpTS2R1fnaGKx1Pec+dSq18mlDtnLyL29RcLTuAsdMYG1xGPh0be3jtu/nTk+blLyt8zaGFl8vj8FjK2RydzC2tKK3nUn7El2t9yIJ1d8IC6uFUtdLWnxam918cuYp1H5Yw6o+nchm+v7vJ3lS7vrmrc3NV7zq1ZOUpPytmfpzTGX1Zk42GItJV6r5zl1Qpr8KcupIsxpfhDp3BacuMde28chc3tLoXdxUXN+Sn+Ck+afXuk2V/wCInDzIaEy3Qn0rjGV5P4rd7fOX4Mu6S9vWjjN2nuuRNHD3jlc4qFLF6o8Jd2cdo072PyqtJd0l9+vb5ywOLy2PzdhC+xl5Ru7afVUpS3Xmfc/IzMAAA6k33dZGGuuNGF0zCrZ4mVPKZVbraEt6NJ/jSXW/IvWitmf1DlNTZWpkstdzuLmfa+SiuyMV1JLuRi4/H3eVv6NjY29S4uq8lCnSprdyZazhhw1t9C4t17noVs1cx2uKq5qnH+rh5O99r8hIAAAAAAAAAAAAAAAAAAANZqHA2WpsFd4fIQlK2uYdGTi9pRa5qS8qezINl8HLJ/HujHUFn8U6Xz3Rn4Tb8nq39JMWjdE4nRGKdljYSlUqNSr3NT+crSXf3JdiXJHRgjTjXpfL6m0lbLEQqV6lnceGqWsOurHotbpdrXd5WVtt9M566u/ilDDZCpcJ7Omrae68/LkShpHgFlL+dO51NXWPtuTdrSalWku5vqj7WT3g8Bi9N42GPxFlStbePNqC5yffJvnJ+VmyMLK4mwzmNrY7JWtO5tKy2nTmuXnXc12NdRWfiHwcyelp1chiI1chh+cm4x3q0F3TS61+MvTsRebTB6jzGm7z41iMjXs6vb4OXKX5S6n6SXdPfCKu6MY0dQ4mFylydxaS6EvTB8n6GiRMXxo0Pk4rpZWVlN7fIu6Mo7elJr2nTW+sNM3celQ1Di6i8l3D956z1NgKcXKecxkUu13dP95pshxQ0TjYy8NqOynJLfo28nVb/NTRw+c+ERhbWMoYXGXV7U7KldqlT9XOT9hEmqeKmqdVxnRur921nL/4W03pwa8r65elnFm90vpDNavySssRaSqtfzlWXKnSXfKXUvN1vsLRcP8AhritC2fThtdZSpHateSjs/LGC+9j7X29x2wAAAAAAAAAAAAAAAAAAAAAB93fe/WfAACM9Z8FdP6mlUu7D/0nIy3bnRjvSqP8aHZ51t6SCtT8K9V6XnOdxjp3VpHqurROpDby7c4+lHFuLT2fJ9wPgPu42NphtNZrUNwqGIxtzeTb23pU24rzy6l6WTJpH4Pc26d1qq8UY9fxK0lu35JVOz/D6yccVicfhLCnY4yzo2lrD5tOlHZed978r5mYAAAAAAAAAAAAAAAAAAAAAAAAAADnc1oTS2oW5ZPB2daq+urGHg5/nR2Zw+Q+D5pS5blZ3eRsvxVUjUj+st/aaG4+DbTcn8W1O4x7qtnu/ZI8ofBsqdJdPVNPb8Wyfvm1s/g54Sm07zN39bbrVKnCmn69zrsTwf0RiXGccNG7qLn07ybq/qv5PsO2oW9C1oxo29GnRpR5KFOKjFehHoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//Z"
          alt=""
        />
      </div>
      <el-form
        ref="loginFormRef"
        class="login-form"
        label-width="0"
        :model="loginForm"
        :rules="loginRules"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-yonghu"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="loginForm.password"
            type="password"
            prefix-icon="iconfont icon-mima"
          ></el-input>
        </el-form-item>
        <el-form-item class="el-btn flex">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: function () {
    return {
      loginForm: {
        username: "admin",
        password: "123456",
      },
      //验证规则
      loginRules: {
        username: [
          { required: true, message: "请输入登录账号", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "change" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      try {
        this.$refs.loginFormRef.validate(async (res, rej) => {
          if (!res) return;
          let { data: response } = await this.$axios({
            method: "post",
            url: "login",
            data: this.loginForm,
          });
          console.log(response);
          if (response.meta.status !== 200) {
            return this.$message.error(response.meta.msg);
          }
          this.$message.success(response.meta.msg);

          window.sessionStorage.setItem("token", response.data.token);
          this.$router.push("/home");
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #2b4b6b;
  .login_box {
    position: relative;
    width: 450px;
    height: 300px;
    background-color: #eee;
    .avatar_box {
      width: 130px;
      height: 130px;
      border: 2px solid #fff;
      border-radius: 50%;
      padding: 10px;
      background-color: #ddd;
      overflow: hidden;
      box-shadow: 0 0 5px #fff;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -45%);
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
    .login-form {
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      .el-btn {
        justify-content: flex-end;
      }
    }
  }
}
</style>