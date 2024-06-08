package nk.mframe.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
////        registry.addViewController("/user").setViewName("user");
////        registry.addViewController("/admin").setViewName("admin");
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/");

//        registry.addResourceHandler("/templates/**")
//                .addResourceLocations("classpath:/templates/");
    }

    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/registration").setViewName("registration");
        registry.addViewController("/").setViewName("index");
        //registry.addViewController("/analyz").setViewName("analyz");
        registry.addViewController("/index").setViewName("index");
        registry.addViewController("/login").setViewName("login");
    }
}
