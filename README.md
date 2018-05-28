**1. Быстрый старт**  
    npm run start - сборка папки build, запуск сервера, запуск watch  
    npm run build - запуск сервера, запуск watch  
    

**2. Основные команды моей конфигурации  gulp**    
    1.gulp clean - удалить папку build  
    2.gulp iconFont - генерация tmp-папки со шрифтами  
    3.gulp build - создает новую попку build с последней версткой. Появляется папка build.  
    4.gulp dev - запускает сервер.  
  
  Нет автоматического обновления браузера после изменения исходных файлов в проекте.  
  Поэтому после каждого изменения файла надо перезагружать страницу вручную.  
  
**3. Ветки.**  
  Основная ветка на удаленном репозитории - develop.  
  Ветка master не используется.  
  На проекте необязательно большое количество веток.  
  
  Данный work-flow не предполагает для каждой страницы или для каждого hot-fix делать отдельную ветку.   
  Но если очень хочется, то и не запрещает.  
  
  Каждый сотрудник в проекте отвечает сам за свои ветки.  
  Их надо удалять по мере того, как они стали ненужны.  
  
**4. Ветка develop**  
  На origin/develop выливать только готовый оттестированный код.  
  То есть эта ветка долна всегда быть deployable/  
  НА эту ветку нельзя заливать промежуточные коммиты, которые могут поломать сборку проекта другого сотрудника в случае pull-а с этой ветки  
   
**5. Публикация новых сверстанных страниц.**  
  Сверстанные страницы выкладывать на один домен http://zkh2.u265.morizolabs.ru/  
  Логин / пароль - zkh2 /  zkh2_zkh2  
  На этом домене должен лежать код с ветки origin/develop и никакой другой.   
  
 **6. Документация по проекту**  
  http://redmine.morizo.ru/projects/zkh