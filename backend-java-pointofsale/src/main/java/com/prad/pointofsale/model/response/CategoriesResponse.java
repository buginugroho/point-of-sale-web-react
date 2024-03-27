package com.prad.pointofsale.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoriesResponse {
    
    private Long category_id;
    private String category_name;
    private Long total_products;
}
