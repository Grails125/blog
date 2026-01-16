/**
 * 鏂囩珷缂栬緫鍣ㄩ〉闈? * GET /admin-new/editor - 鏂扮増鏂囩珷缂栬緫鍣? */

const editorHTML = `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>鏂囩珷缂栬緫鍣?- 鍗氬鍚庡彴</title>
    <!-- EasyMDE -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/easymde/dist/easymde.min.css"
    />
    <script src="https://cdn.jsdelivr.net/npm/easymde/dist/easymde.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      .EasyMDEContainer .CodeMirror {
        height: calc(100vh - 360px);
        border-radius: 0.5rem;
        border-color: #e2e8f0;
      }
      .editor-toolbar {
        border-color: #e2e8f0;
        background-color: #f8fafc;
        border-radius: 0.5rem 0.5rem 0 0;
      }
    </style>
  </head>
  <body
    class="bg-slate-50 h-screen flex flex-col overflow-hidden font-sans text-slate-900"
  >
    <!-- Header -->
    <header
      class="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm z-10"
    >
      <div class="flex items-center gap-3">
        <button
          onclick="window.location.href='/admin-new'"
          class="text-slate-500 hover:text-slate-700 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1
          class="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
        >
          馃摑 鏂囩珷缂栬緫鍣?        </h1>
      </div>
      <div class="flex gap-3">
        <button
          onclick="savePost(false)"
          class="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors flex items-center gap-2"
        >
          <span>馃捑</span> 淇濆瓨鑽夌
        </button>
        <button
          onclick="savePost(true)"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-sm flex items-center gap-2"
        >
          <span>馃殌</span> 鍙戝竷鏂囩珷
        </button>
      </div>
    </header>

    <!-- Meta Panel -->
    <div
      class="bg-white px-6 py-4 border-b border-slate-200 grid grid-cols-12 gap-6"
    >
      <!-- Title -->
      <div class="col-span-12 md:col-span-6">
        <label
          class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1"
          >鏂囩珷鏍囬</label
        >
        <input
          type="text"
          id="title"
          class="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          placeholder="杈撳叆鏂囩珷鏍囬..."
        />
        <input type="hidden" id="postId" />
      </div>

      <!-- Category -->
      <div class="col-span-12 md:col-span-3">
        <label
          class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1"
          >鍒嗙被</label
        >
        <div class="flex gap-2">
          <select
            id="category"
            class="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">閫夋嫨鍒嗙被...</option>
          </select>
          <button
            onclick="addNewCategory()"
            class="px-2 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 text-slate-600"
            title="鏂板缓鍒嗙被"
          >
            +
          </button>
        </div>
      </div>

      <!-- Tags -->
      <div class="col-span-12 md:col-span-3">
        <label
          class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1"
          >鏍囩</label
        >
        <input
          type="text"
          id="tags"
          class="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="鎶€鏈? 绗旇 (閫楀彿鍒嗛殧)"
        />
      </div>

      <!-- Cover Image -->
      <div class="col-span-12">
        <label
          class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1"
          >灏侀潰鍥剧墖</label
        >
        <div class="flex gap-3 items-center">
          <input
            type="text"
            id="cover"
            class="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="杈撳叆鍥剧墖 URL 鎴栦笂浼?.."
          />
          <label
            class="cursor-pointer px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-300 transition-colors"
          >
            馃摛 涓婁紶
            <input
              type="file"
              class="hidden"
              accept="image/*"
              onchange="uploadImage(this)"
            />
          </label>
        </div>
      </div>
    </div>

    <!-- Editor -->
    <div class="flex-1 p-6 overflow-hidden">
      <textarea id="markdown-editor"></textarea>
    </div>

    <script>
      let easyMDE;
      let existingCategories = [];

      const getToken = () => localStorage.getItem("admin_token");

      // 鍒濆鍖?      document.addEventListener("DOMContentLoaded", async () => {
        // 妫€鏌ョ櫥褰曠姸鎬?        if (!getToken()) {
          window.location.href = "/admin";
          return;
        }

        initEditor();
        await loadMetaData();

        // Check for ID param to load post
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get("id");
        if (postId) {
          loadPost(postId);
        }
      });

      function initEditor() {
        easyMDE = new EasyMDE({
          element: document.getElementById("markdown-editor"),
          autofocus: true,
          spellChecker: false,
          placeholder: "寮€濮嬫挵鍐欑簿褰╁唴瀹?..",
          toolbar: [
            "bold",
            "italic",
            "heading",
            "|",
            "quote",
            "code",
            "table",
            "|",
            "image",
            "link",
            "|",
            "preview",
            "side-by-side",
            "fullscreen",
            "|",
            "guide",
          ],
          uploadImage: true,
          imageUploadFunction: (file, onSuccess, onError) => {
            const formData = new FormData();
            formData.append("image", file);
            fetch("/api/upload", {
              method: "POST",
              headers: {
                Authorization: \`Bearer \${getToken()}\`,
              },
              body: formData,
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.success) onSuccess(data.url);
                else onError(data.error);
              })
              .catch((err) => onError(err.message));
          },
          renderingConfig: {
            codeSyntaxHighlighting: true,
          },
        });
      }

      async function loadMetaData() {
        try {
          const res = await fetch("/api/meta");
          const data = await res.json();
          if (data.success && data.categories) {
            existingCategories = data.categories;
            const select = document.getElementById("category");
            select.innerHTML =
              '<option value="">閫夋嫨鍒嗙被...</option>' +
              existingCategories
                .map((c) => \`<option value="\${c}">\${c}</option>\`)
                .join("");
          }
        } catch (e) {
          console.error("Failed to load meta data", e);
        }
      }

      async function loadPost(postId) {
        try {
          const res = await fetch(\`/api/posts/\${postId}\`);
          const data = await res.json();
          if (data.success) {
            const post = data.data;
            document.getElementById("postId").value = post.id;
            document.getElementById("title").value = post.title;
            document.getElementById("tags").value = (post.tags || []).join(", ");
                        document.getElementById("cover").value = post.cover || "";
            easyMDE.value(post.content);
            
            // 鍏堝姞杞藉垎绫诲垪琛?            await loadMetaData();
            
            // 鐒跺悗璁剧疆鍒嗙被鍊?            if (post.category) {
              const categorySelect = document.getElementById("category");
              const optionExists = Array.from(categorySelect.options).some(
                option => option.value === post.category
              );
              
              if (!optionExists) {
                const newOption = document.createElement("option");
                newOption.value = post.category;
                newOption.textContent = post.category;
                categorySelect.appendChild(newOption);
                existingCategories.push(post.category);
              }
              
              categorySelect.value = post.category;
            }

          }
        } catch (e) {
          alert("鍔犺浇鏂囩珷澶辫触: " + e.message);
        }
      }

      function addNewCategory() {
        const newCat = prompt("璇疯緭鍏ユ柊鍒嗙被鍚嶇О:");
        if (newCat) {
          const select = document.getElementById("category");
          const opt = document.createElement("option");
          opt.value = newCat;
          opt.text = newCat;
          select.add(opt);
          select.value = newCat;
        }
      }

      async function uploadImage(input) {
        if (input.files && input.files[0]) {
          const formData = new FormData();
          formData.append("image", input.files[0]);
          try {
            const res = await fetch("/api/upload", {
              method: "POST",
              headers: {
                Authorization: \`Bearer \${getToken()}\`,
              },
              body: formData,
            });
            const data = await res.json();
            if (data.success) {
              document.getElementById("cover").value = data.url;
            } else {
              alert("涓婁紶澶辫触: " + data.error);
            }
          } catch (e) {
            alert("涓婁紶鍑洪敊: " + e.message);
          }
        }
      }

      async function savePost(publish = false) {
        const title = document.getElementById("title").value;
        if (!title) return alert("璇疯緭鍏ユ爣棰?);

        const postId = document.getElementById("postId").value;
        const postData = {
          title: title,
          content: easyMDE.value(),
          tags: document
            .getElementById("tags")
            .value.split(/[,锛宂/)
            .map((s) => s.trim())
            .filter(Boolean),
          category: document.getElementById("category").value,
          cover: document.getElementById("cover").value,
          status: publish ? "published" : "draft",
        };

        try {
          let res;
          if (postId) {
            // 鏇存柊鐜版湁鏂囩珷
            res = await fetch(\`/api/posts/\${postId}\`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: \`Bearer \${getToken()}\`,
              },
              body: JSON.stringify(postData),
            });
          } else {
            // 鍒涘缓鏂版枃绔?            res = await fetch("/api/posts/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: \`Bearer \${getToken()}\`,
              },
              body: JSON.stringify(postData),
            });
          }

          const data = await res.json();
          if (data.success) {
            alert(publish ? "鍙戝竷鎴愬姛!" : "淇濆瓨鎴愬姛!");
            if (!postId) {
              document.getElementById("postId").value = data.data.id;
              window.history.replaceState(null, null, "?id=" + data.data.id);
            }
          } else {
            alert("淇濆瓨澶辫触: " + data.error);
          }
        } catch (e) {
          alert("绯荤粺閿欒: " + e.message);
        }
      }
    </script>
  </body>
</html>
`;

export async function onRequestGet() {
  return new Response(editorHTML, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
