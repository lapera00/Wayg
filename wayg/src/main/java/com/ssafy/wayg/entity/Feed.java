package com.ssafy.wayg.entity;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@Getter
@Setter
@Entity
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
@Table(name = "feed")
public class Feed {
    @Id
    @Column(name = "feed_no", nullable = false)
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer feedNo;

    @Column(name = "feed_title", nullable = false, length = 45)
    private String feedTitle;

    @Column(name = "feed_content", nullable = false, length = 100)
    private String feedContent;
    
    @Column(name = "feed_nickname", nullable = false, length = 10)
    private String feedNickname;

    @Column(name = "feed_like")
    @ColumnDefault("0")
    private Integer feedLike;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_no", nullable = false)
    private User userNo;

}