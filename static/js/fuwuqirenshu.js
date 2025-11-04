        // This is for the click to copy
        let t;
        $(document).ready(() => {
            t = $(".ip").html();
        });
        
        $(document).on("click", ".ip", () => {
            let copy = document.createElement("textarea");
            copy.style.position = "absolute";
            copy.style.left = "-99999px";
            copy.style.top = "0";
            copy.setAttribute("id", "ta");
            document.body.appendChild(copy);
            copy.textContent = t;
            copy.select();
            document.execCommand("copy");
            $(".ip").html("<span class='extrapad'>IP已成功复制~</span>");
            setTimeout(function() {
                $(".ip").html(t);
                var copy = document.getElementById("ta");
                copy.parentNode.removeChild(copy);
            }, 800);
        });

        // This is to fetch the player count
        $(document).ready(() => {
            const ip = $(".sip").attr("data-ip");
            const port = $(".sip").attr("data-port");
            
            // 更新时间的函数
            const updateTime = () => {
                const now = new Date();
                const timeString = now.toLocaleTimeString();
                $("#update-time").text(timeString);
            };
            
            // 获取玩家数量的函数
            const fetchPlayerCount = () => {
                $.get(`https://list.mczfw.cn/api/${ip}:${port}`, (result) => {
                    try {
                        // 直接获取p的值，不进行在线检测
                        const playerCount = result.p || "0";
                        $(".sip").html(playerCount);
                        updateTime();
                    } catch (e) {
                        console.error("解析服务器响应时出错:", e);
                        $(".sip").html("错误");
                    }
                }).fail(() => {
                    $(".sip").html("API错误");
                    updateTime();
                });
            };
            
            // 初始调用
            fetchPlayerCount();
            
            // 设置定时器，每3秒更新一次
            setInterval(fetchPlayerCount, 3000);
        });